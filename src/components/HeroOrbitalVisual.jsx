"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

function subscribeReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function checkWebGLSupport() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

// 13 Distributed Peer Nodes (Full 3D constellation volume, balanced depth profile)
// X, Y, and Z spans are balanced (X ~ 4.85, Y ~ 4.10, Z ~ 3.05 units)
// This geometry appears wide face-on and retains visible depth throughout local X rotation
const PEERS = [
  // Outer anchor peers (associated with the 5 domain labels)
  { id: 0, label: "Interfaces", x: -2.30, y: 1.85,  z: 0.85,  colorKey: "interfaces", hasChain: true },
  { id: 1, label: "Tokens",     x: 2.20,  y: 1.95,  z: -0.90, colorKey: "tokens",     hasChain: true },
  { id: 2, label: "Contracts",  x: 2.50,  y: 0.10,  z: 0.75,  colorKey: "contracts",  hasChain: true },
  { id: 3, label: "NFTs",       x: 1.85,  y: -2.00, z: -0.80, colorKey: "nfts",       hasChain: true },
  { id: 4, label: "Wallets",    x: -2.20, y: -1.85, z: 0.70,  colorKey: "wallets",    hasChain: true },

  // Internal distributed mesh peers (no dominant hub, deep 3D volume)
  { id: 5,  label: null, x: -0.90, y: 1.50,  z: -1.40, colorKey: "interfaces", hasChain: false },
  { id: 6,  label: null, x: 0.85,  y: 1.40,  z: 1.30,  colorKey: "tokens",     hasChain: false },
  { id: 7,  label: null, x: -0.85, y: 0.15,  z: -0.35, colorKey: "wallets",    hasChain: true },
  { id: 8,  label: null, x: 0.95,  y: -0.10, z: 0.30,  colorKey: "contracts",  hasChain: false },
  { id: 9,  label: null, x: -0.20, y: -0.40, z: -1.45, colorKey: "wallets",    hasChain: false },
  { id: 10, label: null, x: 0.20,  y: 0.40,  z: 1.50,  colorKey: "nfts",       hasChain: false },
  { id: 11, label: null, x: 0.80,  y: -1.40, z: -1.30, colorKey: "contracts",  hasChain: false },
  { id: 12, label: null, x: -1.00, y: -1.30, z: 1.25,  colorKey: "interfaces", hasChain: false },
];

// Peer-to-peer network links (sparse mesh with front, middle, and rear depth links)
const LINKS = [
  // Outer boundary / perimeter
  [0, 5],
  [5, 1],
  [1, 2],
  [2, 11],
  [11, 3],
  [3, 8],
  [8, 10],
  [10, 6],
  [6, 1],
  [11, 12],
  [12, 4],
  [4, 7],
  [7, 0],

  // Diagonal & cross-depth links between front, middle, and rear peers
  [0, 10],
  [5, 7],
  [5, 9],
  [6, 2],
  [6, 8],
  [7, 9],
  [7, 12],
  [8, 2],
  [8, 11],
  [9, 4],
  [9, 10],
  [9, 11],
  [10, 3],
  [1, 8],
];

// Rotating propagation cycles: 3 branches emit from each anchor peer
const PROPAGATION_CYCLES = [
  // Cycle 0: Origin Peer 0 (Interfaces)
  {
    origin: 0,
    branches: [
      [0, 5, 1, 6],
      [0, 7, 9, 11],
      [0, 10, 8, 2],
    ],
  },
  // Cycle 1: Origin Peer 4 (Wallets)
  {
    origin: 4,
    branches: [
      [4, 7, 0, 5],
      [4, 12, 11, 3],
      [4, 9, 10, 8],
    ],
  },
  // Cycle 2: Origin Peer 1 (Tokens)
  {
    origin: 1,
    branches: [
      [1, 5, 7, 0],
      [1, 6, 2, 8],
      [1, 8, 10, 3],
    ],
  },
  // Cycle 3: Origin Peer 3 (NFTs)
  {
    origin: 3,
    branches: [
      [3, 11, 12, 4],
      [3, 8, 2, 1],
      [3, 10, 0, 7],
    ],
  },
  // Cycle 4: Origin Peer 2 (Contracts)
  {
    origin: 2,
    branches: [
      [2, 1, 5, 9],
      [2, 6, 10, 0],
      [2, 8, 11, 3],
    ],
  },
];

const PALETTES = {
  dark: {
    contracts: 0x4f7cff,
    wallets: 0x22d3ee,
    tokens: 0x2dd4bf,
    nfts: 0x60a5fa,
    interfaces: 0x818cf8,
    linkDefault: 0x4f7cff,
    linkActive: 0x38bdf8,
    blockFill: 0x0f1b38,
    blockWire: 0x4f7cff,
    blockActive: 0x22d3ee,
    packetFill: 0x22d3ee,
    haloOpacity: 0.38,
    linkOpacity: 0.28,
    blockOpacity: 0.45,
    ambient: 0.9,
    directional: 1.4,
  },
  light: {
    contracts: 0x245bdb,
    wallets: 0x0284c7,
    tokens: 0x0f766e,
    nfts: 0x2563eb,
    interfaces: 0x4338ca,
    linkDefault: 0x245bdb,
    linkActive: 0x0284c7,
    blockFill: 0xe0e7ff,
    blockWire: 0x245bdb,
    blockActive: 0x0284c7,
    packetFill: 0x245bdb,
    haloOpacity: 0.22,
    linkOpacity: 0.35,
    blockOpacity: 0.30,
    ambient: 1.15,
    directional: 1.6,
  },
};

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.65)");
  gradient.addColorStop(0.55, "rgba(255, 255, 255, 0.18)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function HeroOrbitalVisual() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webGlReady, setWebGlReady] = useState(false);
  const [overlayOffset, setOverlayOffset] = useState({ x: 0, y: 0 });

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const prefersReducedMotionRef = useRef(prefersReducedMotion);
  useEffect(() => {
    prefersReducedMotionRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  const targetTiltRef = useRef({ x: 0, y: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!checkWebGLSupport() || !canvasRef.current || !containerRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    // Perspective camera framed with >20% breathing room across all 4 edges throughout full 360° rotation
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    // Controlled scene lighting for 3D block facets
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 7, 7);
    scene.add(dirLight);

    // Group Hierarchy:
    // 1. parentTiltGroup: receives slower smooth Y and Z tilts at different rates + pointer smoothing
    const parentTiltGroup = new THREE.Group();
    scene.add(parentTiltGroup);

    // 2. spinningGroup: rotates continuously around its own local X axis (1 turn per 35s in one fixed direction)
    const spinningGroup = new THREE.Group();
    parentTiltGroup.add(spinningGroup);

    // 1. Peer Node Objects (Attached to spinningGroup)
    const glowTexture = createGlowTexture();
    const peerSphereGeo = new THREE.SphereGeometry(0.09, 16, 16);

    const peerNodes = PEERS.map((peer) => {
      const group = new THREE.Group();
      group.position.set(peer.x, peer.y, peer.z);

      const coreMat = new THREE.MeshStandardMaterial({
        roughness: 0.15,
        metalness: 0.35,
      });
      const coreMesh = new THREE.Mesh(peerSphereGeo, coreMat);

      const haloMat = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
      });
      const haloSprite = new THREE.Sprite(haloMat);
      haloSprite.scale.set(0.38, 0.38, 1);

      group.add(coreMesh, haloSprite);
      spinningGroup.add(group);

      return {
        ...peer,
        group,
        coreMesh,
        coreMat,
        haloSprite,
        haloMat,
      };
    });

    // 2. Peer-to-Peer Network Links (Attached to spinningGroup, perfectly rigid during spin)
    const linkLines = LINKS.map(([fromIdx, toIdx]) => {
      const pA = PEERS[fromIdx];
      const pB = PEERS[toIdx];

      const points = [
        new THREE.Vector3(pA.x, pA.y, pA.z),
        new THREE.Vector3(pB.x, pB.y, pB.z),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.28,
      });
      const line = new THREE.Line(geo, mat);
      spinningGroup.add(line);

      return {
        from: fromIdx,
        to: toIdx,
        line,
        mat,
      };
    });

    // 3. Linked Blockchain Blocks beside selected peers (Attached to peer groups within spinningGroup)
    const blockBoxGeo = new THREE.BoxGeometry(0.10, 0.10, 0.10);
    const blockEdgeGeo = new THREE.EdgesGeometry(blockBoxGeo);

    const chainGroups = [];
    peerNodes.forEach((peer) => {
      if (!peer.hasChain) return;

      const len = Math.sqrt(peer.x * peer.x + peer.y * peer.y) || 1;
      const dirX = (peer.x / len) * 0.18;
      const dirY = (peer.y / len) * 0.18;

      const blocks = [];
      for (let b = 0; b < 3; b++) {
        const blockGroup = new THREE.Group();
        const dist = 1.0 + b * 0.9;
        blockGroup.position.set(dirX * dist, dirY * dist, 0);

        const fillMat = new THREE.MeshStandardMaterial({
          roughness: 0.2,
          metalness: 0.4,
          transparent: true,
          opacity: 0.45,
        });
        const fillMesh = new THREE.Mesh(blockBoxGeo, fillMat);

        const wireMat = new THREE.LineBasicMaterial({
          transparent: true,
          opacity: 0.85,
        });
        const wireMesh = new THREE.LineSegments(blockEdgeGeo, wireMat);

        blockGroup.add(fillMesh, wireMesh);
        peer.group.add(blockGroup);

        if (b > 0) {
          const prevDist = 1.0 + (b - 1) * 0.9;
          const linkPoints = [
            new THREE.Vector3(dirX * prevDist, dirY * prevDist, 0),
            new THREE.Vector3(dirX * dist, dirY * dist, 0),
          ];
          const linkGeo = new THREE.BufferGeometry().setFromPoints(linkPoints);
          const microLine = new THREE.Line(linkGeo, wireMat);
          peer.group.add(microLine);
        }

        blocks.push({
          blockGroup,
          fillMesh,
          fillMat,
          wireMesh,
          wireMat,
        });
      }

      chainGroups.push({
        peerId: peer.id,
        blocks,
      });
    });

    // 4. Traveling Block Packets (Attached to spinningGroup, traversing local coordinates)
    const packetBoxGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const packetEdgeGeo = new THREE.EdgesGeometry(packetBoxGeo);

    const travelingPackets = [0, 1, 2].map(() => {
      const group = new THREE.Group();
      group.visible = false;

      const fillMat = new THREE.MeshStandardMaterial({
        roughness: 0.1,
        metalness: 0.5,
        transparent: true,
        opacity: 0.95,
      });
      const fillMesh = new THREE.Mesh(packetBoxGeo, fillMat);

      const wireMat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 1.0,
      });
      const wireMesh = new THREE.LineSegments(packetEdgeGeo, wireMat);

      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.set(0.40, 0.40, 1);

      group.add(fillMesh, wireMesh, glowSprite);
      spinningGroup.add(group);

      return {
        group,
        fillMesh,
        fillMat,
        wireMesh,
        wireMat,
        glowSprite,
        glowMat,
      };
    });

    // 5. In-Place Theme Updating & Interpolation
    const colorFrom = new THREE.Color();
    const colorTo = new THREE.Color();
    const tempColor = new THREE.Color();

    function getInterpolatedColor(fromHex, toHex, t) {
      colorFrom.setHex(fromHex);
      colorTo.setHex(toHex);
      tempColor.copy(colorFrom).lerp(colorTo, t);
      return tempColor;
    }

    function applyThemeInterpolated(fromPal, toPal, t) {
      // Peer markers
      peerNodes.forEach((peer) => {
        const hex = fromPal[peer.colorKey] || fromPal.contracts;
        const hexTarget = toPal[peer.colorKey] || toPal.contracts;
        const col = getInterpolatedColor(hex, hexTarget, t);

        peer.coreMat.color.copy(col);
        peer.haloMat.color.copy(col);
        peer.haloMat.opacity = THREE.MathUtils.lerp(fromPal.haloOpacity, toPal.haloOpacity, t);
      });

      // Network links
      linkLines.forEach((link) => {
        const col = getInterpolatedColor(fromPal.linkDefault, toPal.linkDefault, t);
        link.mat.color.copy(col);
        link.mat.opacity = THREE.MathUtils.lerp(fromPal.linkOpacity, toPal.linkOpacity, t);
      });

      // Chain blocks
      chainGroups.forEach((cg) => {
        cg.blocks.forEach((blk) => {
          const fillCol = getInterpolatedColor(fromPal.blockFill, toPal.blockFill, t);
          const wireCol = getInterpolatedColor(fromPal.blockWire, toPal.blockWire, t);

          blk.fillMat.color.copy(fillCol);
          blk.fillMat.opacity = THREE.MathUtils.lerp(fromPal.blockOpacity, toPal.blockOpacity, t);
          blk.wireMat.color.copy(wireCol);
        });
      });

      // Traveling packets
      travelingPackets.forEach((pkt) => {
        const col = getInterpolatedColor(fromPal.packetFill, toPal.packetFill, t);
        pkt.fillMat.color.copy(col);
        pkt.wireMat.color.copy(col);
        pkt.glowMat.color.copy(col);
      });

      // Lights
      ambientLight.intensity = THREE.MathUtils.lerp(fromPal.ambient, toPal.ambient, t);
      dirLight.intensity = THREE.MathUtils.lerp(fromPal.directional, toPal.directional, t);
    }

    let initialIsDark = document.documentElement.classList.contains("dark");
    let targetThemeIsDark = initialIsDark;
    let fromThemeIsDark = initialIsDark;
    let themeTransitionProgress = 1.0;
    let themeTransitionStartTime = 0;

    applyThemeInterpolated(
      initialIsDark ? PALETTES.dark : PALETTES.light,
      initialIsDark ? PALETTES.dark : PALETTES.light,
      1.0
    );

    // Initial render and transition from fallback
    renderer.render(scene, camera);
    const readyRafId = requestAnimationFrame(() => {
      setWebGlReady(true);
    });

    // 6. Fluid Delta-Time Animation Engine
    let isIntersecting = true;
    let isTabVisible = !document.hidden;
    let animationFrameId = null;
    let lastTime = performance.now();
    let accumulatedTime = 0;

    const CYCLE_DURATION = 6.2; // seconds per propagation cycle
    const PROPAGATION_WINDOW = 4.4; // time spent traversing branches
    const X_ROTATION_SPEED = (2 * Math.PI) / 35; // exactly 1 full turn every 35s around local X

    function updateNetworkMotion(dt) {
      accumulatedTime += dt;

      // 1. Continuous rotation of entire network around its own local X axis
      // In one fixed direction at constant speed (1 full turn every 35s)
      spinningGroup.rotation.x = accumulatedTime * X_ROTATION_SPEED;

      // 2. Slower, smooth Y and Z tilts applied to parent group at different rates
      // Slower rates: Y (~52s cycle, 0.12 rad/s) and Z (~78s cycle, 0.08 rad/s)
      parentTiltGroup.rotation.y = Math.sin(accumulatedTime * 0.12) * 0.35;
      parentTiltGroup.rotation.z = Math.cos(accumulatedTime * 0.08) * 0.25;

      // 3. Pointer interaction: gentle tilt damping applied to parent position/tilt
      const dampFactor = 1 - Math.exp(-4.8 * dt);
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * dampFactor;
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * dampFactor;

      parentTiltGroup.position.x = currentTiltRef.current.y * 0.35;
      parentTiltGroup.position.y = -currentTiltRef.current.x * 0.35;

      // 4. Propagation Cycle calculations
      const cycleIndex = Math.floor(accumulatedTime / CYCLE_DURATION) % PROPAGATION_CYCLES.length;
      const cycleTime = accumulatedTime % CYCLE_DURATION;
      const currentCycle = PROPAGATION_CYCLES[cycleIndex];

      const branches = currentCycle.branches;

      // Origin peer breathing pulse at cycle start
      if (cycleTime < 1.2) {
        const pNorm = cycleTime / 1.2;
        const scale = 1.0 + Math.sin(pNorm * Math.PI) * 0.35;
        const originPeer = peerNodes[currentCycle.origin];
        if (originPeer) {
          originPeer.group.scale.set(scale, scale, scale);
        }
      } else {
        const originPeer = peerNodes[currentCycle.origin];
        if (originPeer) {
          originPeer.group.scale.set(1.0, 1.0, 1.0);
        }
      }

      // Traveling packets along each branch (in spinningGroup local coordinate frame)
      travelingPackets.forEach((pkt, bIdx) => {
        const branch = branches[bIdx];
        if (!branch || cycleTime >= PROPAGATION_WINDOW) {
          pkt.group.visible = false;
          return;
        }

        pkt.group.visible = true;

        const branchProgress = cycleTime / PROPAGATION_WINDOW;
        const totalSegments = branch.length - 1;
        const currentSegment = Math.min(
          totalSegments - 1,
          Math.floor(branchProgress * totalSegments)
        );
        const segmentProgress = (branchProgress * totalSegments) - currentSegment;

        const fromNode = PEERS[branch[currentSegment]];
        const toNode = PEERS[branch[currentSegment + 1]];

        if (fromNode && toNode) {
          pkt.group.position.set(
            THREE.MathUtils.lerp(fromNode.x, toNode.x, segmentProgress),
            THREE.MathUtils.lerp(fromNode.y, toNode.y, segmentProgress),
            THREE.MathUtils.lerp(fromNode.z, toNode.z, segmentProgress)
          );

          // Jewel-like rotation as block propagates
          pkt.fillMesh.rotation.x += dt * 2.8;
          pkt.fillMesh.rotation.y += dt * 2.2;
          pkt.wireMesh.rotation.x = pkt.fillMesh.rotation.x;
          pkt.wireMesh.rotation.y = pkt.fillMesh.rotation.y;

          // Fade out near end of branch
          const fade = cycleTime > PROPAGATION_WINDOW - 0.5
            ? (PROPAGATION_WINDOW - cycleTime) / 0.5
            : 1.0;
          pkt.fillMat.opacity = fade * 0.95;
          pkt.glowMat.opacity = fade * 0.65;
        }
      });

      // Local Chain highlight when peer receives new block
      chainGroups.forEach((cg) => {
        const targetBlock = cg.blocks[2]; // Newest block in chain
        let isHighlighted = false;

        branches.forEach((branch) => {
          const hopIndex = branch.indexOf(cg.peerId);
          if (hopIndex > 0) {
            const hitTime = (hopIndex / (branch.length - 1)) * PROPAGATION_WINDOW;
            if (cycleTime >= hitTime && cycleTime <= hitTime + 0.9) {
              isHighlighted = true;
              const flashProgress = (cycleTime - hitTime) / 0.9;
              const pop = Math.sin(flashProgress * Math.PI);
              const scale = 1.0 + pop * 0.35;
              targetBlock.blockGroup.scale.set(scale, scale, scale);

              const pal = targetThemeIsDark ? PALETTES.dark : PALETTES.light;
              targetBlock.wireMat.color.setHex(pal.blockActive);
            }
          }
        });

        if (!isHighlighted) {
          targetBlock.blockGroup.scale.set(1.0, 1.0, 1.0);
          const pal = targetThemeIsDark ? PALETTES.dark : PALETTES.light;
          targetBlock.wireMat.color.setHex(pal.blockWire);
        }
      });
    }

    function renderFrame(now) {
      if (typeof now !== "number") now = performance.now();
      let dt = (now - lastTime) / 1000;
      lastTime = now;

      // Tab jump clamping
      if (dt > 0.1) dt = 0.1;
      if (dt < 0) dt = 0;

      // Theme transition interpolation (420ms smooth ease-in-out)
      if (themeTransitionProgress < 1.0) {
        const elapsed = (now - themeTransitionStartTime) / 420;
        themeTransitionProgress = Math.min(1.0, elapsed);
        const t =
          themeTransitionProgress < 0.5
            ? 2 * themeTransitionProgress * themeTransitionProgress
            : -1 + (4 - 2 * themeTransitionProgress) * themeTransitionProgress;

        const fromPal = fromThemeIsDark ? PALETTES.dark : PALETTES.light;
        const toPal = targetThemeIsDark ? PALETTES.dark : PALETTES.light;
        applyThemeInterpolated(fromPal, toPal, t);
      }

      if (!prefersReducedMotionRef.current) {
        updateNetworkMotion(dt);
      } else {
        // Reduced motion: composed still view
        spinningGroup.rotation.x = 0;
        parentTiltGroup.rotation.y = 0.15;
        parentTiltGroup.rotation.z = -0.10;
        parentTiltGroup.position.set(0, 0, 0);
      }

      renderer.render(scene, camera);

      if (!prefersReducedMotionRef.current) {
        animationFrameId = requestAnimationFrame(renderFrame);
      } else if (themeTransitionProgress < 1.0) {
        animationFrameId = requestAnimationFrame(renderFrame);
      } else {
        animationFrameId = null;
      }
    }

    function startLoop() {
      if (!animationFrameId && isIntersecting && isTabVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    }

    function stopLoop() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    if (!prefersReducedMotionRef.current) {
      startLoop();
    }

    // Theme mutation observer
    const themeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark !== targetThemeIsDark) {
        fromThemeIsDark = targetThemeIsDark;
        targetThemeIsDark = isDark;
        themeTransitionStartTime = performance.now();
        themeTransitionProgress = 0.0;
        startLoop();
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Visibility & offscreen pause
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Responsive canvas resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          if (prefersReducedMotionRef.current) {
            renderer.render(scene, camera);
          }
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(readyRafId);
      stopLoop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      glowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  function handlePointerMove(e) {
    if (prefersReducedMotion || e.pointerType === "touch" || !containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Gentle 4-5 degrees maximum tilt (~0.078 rad)
    targetTiltRef.current.y = x * 0.078;
    targetTiltRef.current.x = -y * 0.078;
    setOverlayOffset({ x: x * 3.0, y: y * 3.0 });
  }

  function handlePointerLeave() {
    targetTiltRef.current.x = 0;
    targetTiltRef.current.y = 0;
    setOverlayOffset({ x: 0, y: 0 });
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex items-center justify-center select-none w-full max-w-[460px] aspect-square mx-auto lg:mx-0"
    >
      {/* Restrained ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[210px] w-[210px] rounded-full bg-[#245BDB]/6 blur-3xl dark:bg-[#4F7CFF]/10 motion-reduce:animate-none animate-ambient-drift" />
        <div className="h-[135px] w-[135px] rounded-full bg-[#0284C7]/5 blur-2xl dark:bg-[#22D3EE]/8" />
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${
          webGlReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700 ease-out`}
        aria-hidden="true"
      />

      {/* Static SVG Fallback (Distributed Peer Network with Linked Block Chains) */}
      {!webGlReady && (
        <div className="absolute inset-0 h-full w-full" aria-hidden="true">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="linkGradient1" x1="101" y1="130" x2="393" y2="123" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4338CA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0F766E" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="linkGradient2" x1="393" y1="123" x2="413" y2="244" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0F766E" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#245BDB" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="activePacketGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4F7CFF" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Peer-to-Peer Network Links */}
            <g className="text-slate-400/40 dark:text-slate-500/25" stroke="currentColor" strokeWidth="1.25">
              {/* Perimeter links */}
              <line x1="101" y1="130" x2="192" y2="153" />
              <line x1="192" y1="153" x2="393" y2="123" />
              <line x1="393" y1="123" x2="413" y2="244" />
              <line x1="413" y1="244" x2="302" y2="341" />
              <line x1="302" y1="341" x2="370" y2="380" />
              <line x1="370" y1="380" x2="312" y2="257" />
              <line x1="312" y1="257" x2="263" y2="224" />
              <line x1="263" y1="224" x2="305" y2="159" />
              <line x1="305" y1="159" x2="393" y2="123" />
              <line x1="302" y1="341" x2="185" y2="335" />
              <line x1="185" y1="335" x2="107" y2="370" />
              <line x1="107" y1="370" x2="195" y2="240" />
              <line x1="195" y1="240" x2="101" y2="130" />

              {/* Internal mesh and diagonal links across front, middle, and rear */}
              <line x1="192" y1="153" x2="195" y2="240" />
              <line x1="192" y1="153" x2="237" y2="276" />
              <line x1="305" y1="159" x2="413" y2="244" />
              <line x1="305" y1="159" x2="312" y2="257" />
              <line x1="195" y1="240" x2="237" y2="276" strokeWidth="1.5" />
              <line x1="195" y1="240" x2="185" y2="335" />
              <line x1="312" y1="257" x2="413" y2="244" />
              <line x1="312" y1="257" x2="302" y2="341" />
              <line x1="237" y1="276" x2="107" y2="370" />
              <line x1="237" y1="276" x2="263" y2="224" />
              <line x1="237" y1="276" x2="302" y2="341" />
              <line x1="393" y1="123" x2="312" y2="257" />

              {/* Subtle diagonal depth accents */}
              <line x1="101" y1="130" x2="263" y2="224" strokeDasharray="3 4" />
              <line x1="263" y1="224" x2="370" y2="380" strokeDasharray="3 4" />
            </g>

            {/* Active Propagation Branch Link Highlight */}
            <line x1="101" y1="130" x2="192" y2="153" stroke="#245BDB" className="dark:stroke-[#4F7CFF]" strokeWidth="2" />
            <line x1="192" y1="153" x2="393" y2="123" stroke="#0284C7" className="dark:stroke-[#22D3EE]" strokeWidth="2" strokeDasharray="4 3" />

            {/* Traveling Block Packet in transit */}
            <g transform="translate(292, 138) rotate(15)">
              <rect x="-6" y="-6" width="12" height="12" rx="1.5" className="fill-[#0284C7] dark:fill-[#22D3EE] stroke-white dark:stroke-[#070A12]" strokeWidth="1" />
              <circle cx="0" cy="0" r="10" className="fill-[#0284C7]/20 dark:fill-[#22D3EE]/30" />
            </g>

            {/* Blockchain linked micro-blocks beside anchor peers */}
            {/* Peer 0 (Interfaces): 3 linked blocks */}
            <g transform="translate(101, 130)">
              <line x1="-12" y1="-8" x2="-22" y2="-15" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <line x1="-22" y1="-15" x2="-32" y2="-22" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <rect x="-15" y="-11" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#4338CA] dark:stroke-[#818CF8]" strokeWidth="1" />
              <rect x="-25" y="-18" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#4338CA] dark:stroke-[#818CF8]" strokeWidth="1" />
              <rect x="-35" y="-25" width="7" height="7" rx="1" className="fill-[#4338CA] dark:fill-[#818CF8] stroke-white dark:stroke-[#070A12]" strokeWidth="1.25" />
            </g>

            {/* Peer 1 (Tokens): 3 linked blocks */}
            <g transform="translate(393, 123)">
              <line x1="12" y1="-8" x2="22" y2="-15" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <line x1="22" y1="-15" x2="32" y2="-22" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <rect x="9" y="-11" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#0F766E] dark:stroke-[#2DD4BF]" strokeWidth="1" />
              <rect x="19" y="-18" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#0F766E] dark:stroke-[#2DD4BF]" strokeWidth="1" />
              <rect x="29" y="-25" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#0F766E] dark:stroke-[#2DD4BF]" strokeWidth="1" />
            </g>

            {/* Peer 2 (Contracts): 3 linked blocks */}
            <g transform="translate(413, 244)">
              <line x1="12" y1="0" x2="22" y2="0" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <line x1="22" y1="0" x2="32" y2="0" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <rect x="9" y="-3.5" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#245BDB] dark:stroke-[#4F7CFF]" strokeWidth="1" />
              <rect x="19" y="-3.5" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#245BDB] dark:stroke-[#4F7CFF]" strokeWidth="1" />
              <rect x="29" y="-3.5" width="7" height="7" rx="1" className="fill-[#245BDB] dark:fill-[#4F7CFF] stroke-white dark:stroke-[#070A12]" strokeWidth="1.25" />
            </g>

            {/* Peer 3 (NFTs): 3 linked blocks */}
            <g transform="translate(370, 380)">
              <line x1="10" y1="8" x2="19" y2="16" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <line x1="19" y1="16" x2="28" y2="24" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <rect x="7" y="5" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#2563EB] dark:stroke-[#60A5FA]" strokeWidth="1" />
              <rect x="16" y="13" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#2563EB] dark:stroke-[#60A5FA]" strokeWidth="1" />
              <rect x="25" y="21" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#2563EB] dark:stroke-[#60A5FA]" strokeWidth="1" />
            </g>

            {/* Peer 4 (Wallets): 3 linked blocks */}
            <g transform="translate(107, 370)">
              <line x1="-10" y1="8" x2="-19" y2="16" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <line x1="-19" y1="16" x2="-28" y2="24" stroke="currentColor" className="text-slate-400 dark:text-slate-500" strokeWidth="1" />
              <rect x="-14" y="5" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#0284C7] dark:stroke-[#22D3EE]" strokeWidth="1" />
              <rect x="-23" y="13" width="7" height="7" rx="1" className="fill-[#E0E7FF] dark:fill-[#0F1B38] stroke-[#0284C7] dark:stroke-[#22D3EE]" strokeWidth="1" />
              <rect x="-32" y="21" width="7" height="7" rx="1" className="fill-[#0284C7] dark:fill-[#22D3EE] stroke-white dark:stroke-[#070A12]" strokeWidth="1.25" />
            </g>

            {/* Peer Nodes (Circles with soft halo glow) */}
            {/* Peer 0: Interfaces */}
            <circle cx="101" cy="130" r="10" className="fill-[#4338CA]/15 dark:fill-[#818CF8]/25" />
            <circle cx="101" cy="130" r="5" className="fill-[#4338CA] dark:fill-[#818CF8]" />

            {/* Peer 1: Tokens */}
            <circle cx="393" cy="123" r="10" className="fill-[#0F766E]/15 dark:fill-[#2DD4BF]/25" />
            <circle cx="393" cy="123" r="5" className="fill-[#0F766E] dark:fill-[#2DD4BF]" />

            {/* Peer 2: Contracts */}
            <circle cx="413" cy="244" r="10" className="fill-[#245BDB]/15 dark:fill-[#4F7CFF]/25" />
            <circle cx="413" cy="244" r="5" className="fill-[#245BDB] dark:fill-[#4F7CFF]" />

            {/* Peer 3: NFTs */}
            <circle cx="370" cy="380" r="10" className="fill-[#2563EB]/15 dark:fill-[#60A5FA]/25" />
            <circle cx="370" cy="380" r="5" className="fill-[#2563EB] dark:fill-[#60A5FA]" />

            {/* Peer 4: Wallets */}
            <circle cx="107" cy="370" r="10" className="fill-[#0284C7]/15 dark:fill-[#22D3EE]/25" />
            <circle cx="107" cy="370" r="5" className="fill-[#0284C7] dark:fill-[#22D3EE]" />

            {/* Internal Peers (Balanced constellation points) */}
            <circle cx="192" cy="153" r="4" className="fill-slate-600 dark:fill-slate-300" />
            <circle cx="305" cy="159" r="4" className="fill-slate-600 dark:fill-slate-300" />
            <circle cx="195" cy="240" r="4.5" className="fill-[#245BDB] dark:fill-[#4F7CFF]" />
            <circle cx="312" cy="257" r="4" className="fill-slate-600 dark:fill-slate-300" />
            <circle cx="237" cy="276" r="4" className="fill-slate-600 dark:fill-slate-300" />
            <circle cx="263" cy="224" r="4.5" className="fill-[#2563EB] dark:fill-[#60A5FA]" />
            <circle cx="302" cy="341" r="4" className="fill-slate-600 dark:fill-slate-300" />
            <circle cx="185" cy="335" r="4" className="fill-slate-600 dark:fill-slate-300" />
          </svg>
        </div>
      )}

      {/* Floating Domain Labels: Exactly five crisp upright HTML overlays */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transform-none"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `translate3d(${overlayOffset.x}px, ${overlayOffset.y}px, 0)`,
        }}
      >
        {/* Label 1: Interfaces (Anchor Peer 0, Top-Left) */}
        <div className="absolute top-[7%] left-[6%] sm:left-[7%] flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0B101D]/90 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4338CA] dark:bg-[#818CF8]" />
          <span>Interfaces</span>
        </div>

        {/* Label 2: Tokens (Anchor Peer 1, Top-Right) */}
        <div className="absolute top-[8%] right-[6%] sm:right-[7%] flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0B101D]/90 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E] dark:bg-[#2DD4BF]" />
          <span>Tokens</span>
        </div>

        {/* Label 3: Contracts (Anchor Peer 2, Mid-Right) */}
        <div className="absolute top-[48%] right-[3%] sm:right-[4%] flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0B101D]/90 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#245BDB] dark:bg-[#4F7CFF]" />
          <span>Contracts</span>
        </div>

        {/* Label 4: NFTs (Anchor Peer 3, Bottom-Right) */}
        <div className="absolute bottom-[9%] right-[9%] sm:right-[11%] flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0B101D]/90 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] dark:bg-[#60A5FA]" />
          <span>NFTs</span>
        </div>

        {/* Label 5: Wallets (Anchor Peer 4, Bottom-Left) */}
        <div className="absolute bottom-[11%] left-[6%] sm:left-[7%] flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[11px] sm:px-3 sm:py-1 sm:text-xs font-medium text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#0B101D]/90 dark:text-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7] dark:bg-[#22D3EE]" />
          <span>Wallets</span>
        </div>
      </div>
    </div>
  );
}
