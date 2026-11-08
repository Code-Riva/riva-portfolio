export default function ProjectPlaceholderGraphic({
  type,
  accentHex,
  title,
}) {
  switch (type) {
    case "token-blueprint":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Blueprint graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#070b09]" />
          <path
            d="M0 55H400M0 110H400M0 165H400M100 0V220M200 0V220M300 0V220"
            stroke={accentHex}
            strokeOpacity="0.12"
            strokeDasharray="4 4"
          />
          <circle
            cx="200"
            cy="110"
            r="60"
            stroke={accentHex}
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <circle
            cx="200"
            cy="110"
            r="44"
            stroke={accentHex}
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.6"
          />
          <polygon
            points="200,65 240,110 200,155 160,110"
            stroke={accentHex}
            strokeWidth="2"
            fill={accentHex}
            fillOpacity="0.1"
          />
          <circle cx="200" cy="110" r="10" fill={accentHex} fillOpacity="0.3" />
          <circle cx="200" cy="110" r="4" fill={accentHex} />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRGN · TOKEN LANDING ARCHITECTURE
          </text>
        </svg>
      );

    case "wallet-interface":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Interface graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#08070d]" />
          <rect
            x="70"
            y="35"
            width="260"
            height="135"
            rx="12"
            className="fill-white dark:fill-[#0f0c18]"
            stroke={accentHex}
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          <rect
            x="90"
            y="55"
            width="80"
            height="16"
            rx="8"
            fill={accentHex}
            fillOpacity="0.2"
          />
          <rect
            x="90"
            y="85"
            width="130"
            height="22"
            rx="4"
            fill={accentHex}
            fillOpacity="0.25"
          />
          <rect
            x="90"
            y="115"
            width="75"
            height="10"
            rx="3"
            className="fill-slate-300 dark:fill-[#4c4765]"
          />
          <circle cx="295" cy="63" r="5" fill={accentHex} />
          <circle
            cx="295"
            cy="63"
            r="10"
            stroke={accentHex}
            strokeOpacity="0.3"
          />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.2"
            fontWeight="600"
          >
            DRAGOON’S WALLET · NON-CUSTODIAL DASHBOARD
          </text>
        </svg>
      );

    case "market-chart":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Market chart graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#060912]" />
          <line
            x1="50"
            y1="50"
            x2="350"
            y2="50"
            stroke={accentHex}
            strokeOpacity="0.12"
          />
          <line
            x1="50"
            y1="100"
            x2="350"
            y2="100"
            stroke={accentHex}
            strokeOpacity="0.12"
          />
          <line
            x1="50"
            y1="150"
            x2="350"
            y2="150"
            stroke={accentHex}
            strokeOpacity="0.12"
          />
          <path
            d="M50 145 Q 110 130, 150 90 T 230 110 T 310 65 L 350 75 L 350 160 L 50 160 Z"
            fill={accentHex}
            fillOpacity="0.1"
          />
          <path
            d="M50 145 Q 110 130, 150 90 T 230 110 T 310 65 L 350 75"
            stroke={accentHex}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="150" cy="90" r="4" fill={accentHex} />
          <circle cx="230" cy="110" r="4" fill={accentHex} />
          <circle cx="310" cy="65" r="4" fill={accentHex} />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRAGOON MARKET · HISTORICAL PRICE METRICS
          </text>
        </svg>
      );

    case "forge-anvil":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Forge anvil graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#0d0806]" />
          <circle
            cx="200"
            cy="110"
            r="70"
            fill={accentHex}
            fillOpacity="0.08"
          />
          <path
            d="M130 90 H270 L255 115 H235 L245 145 H155 L165 115 H145 L130 90 Z"
            fill={accentHex}
            fillOpacity="0.15"
            stroke={accentHex}
            strokeWidth="1.75"
          />
          <line
            x1="225"
            y1="50"
            x2="260"
            y2="75"
            stroke={accentHex}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect
            x="248"
            y="45"
            width="22"
            height="14"
            rx="2"
            transform="rotate(35 248 45)"
            fill={accentHex}
            fillOpacity="0.8"
          />
          <circle cx="215" cy="80" r="2.5" fill={accentHex} />
          <circle cx="200" cy="72" r="1.5" fill={accentHex} />
          <circle cx="230" cy="85" r="2" fill={accentHex} />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRAGOON’S BLACKSMITH · ERC-20 TOKEN FORGE
          </text>
        </svg>
      );

    case "relic-crest":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Relic crest graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#0d0607]" />
          <path
            d="M200 45 L255 75 V125 C255 155 200 175 200 175 C200 175 145 155 145 125 V75 L200 45 Z"
            fill={accentHex}
            fillOpacity="0.12"
            stroke={accentHex}
            strokeWidth="1.5"
          />
          <line
            x1="200"
            y1="60"
            x2="200"
            y2="145"
            stroke={accentHex}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="185"
            y1="85"
            x2="215"
            y2="85"
            stroke={accentHex}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="200" cy="150" r="3" fill={accentHex} />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRAGOON’S RELICS · NFT & ERC-721 MINT
          </text>
        </svg>
      );

    case "gate-signature":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Gate signature graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#08080f]" />
          <path
            d="M150 160 V95 C150 67 172 45 200 45 C228 45 250 67 250 95 V160"
            stroke={accentHex}
            strokeWidth="2"
            strokeOpacity="0.4"
            fill="none"
          />
          <rect
            x="182"
            y="95"
            width="36"
            height="46"
            rx="6"
            fill={accentHex}
            fillOpacity="0.18"
            stroke={accentHex}
            strokeWidth="1.5"
          />
          <circle cx="200" cy="112" r="5" fill={accentHex} />
          <path
            d="M200 117 V128"
            stroke={accentHex}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M110 110 H130 M270 110 H290"
            stroke={accentHex}
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRAGOON’S GATE · EIP-4361 SIWE AUTH
          </text>
        </svg>
      );

    case "dispatch-network":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Dispatch network graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#050a0d]" />
          <circle
            cx="140"
            cy="105"
            r="16"
            fill={accentHex}
            fillOpacity="0.22"
            stroke={accentHex}
            strokeWidth="2"
          />
          <circle cx="140" cy="105" r="5" fill={accentHex} />
          <path
            d="M156 105 L260 60 M156 105 L260 105 M156 105 L260 150"
            stroke={accentHex}
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <circle
            cx="260"
            cy="60"
            r="10"
            fill={accentHex}
            fillOpacity="0.18"
            stroke={accentHex}
            strokeWidth="1.5"
          />
          <circle
            cx="260"
            cy="105"
            r="10"
            fill={accentHex}
            fillOpacity="0.18"
            stroke={accentHex}
            strokeWidth="1.5"
          />
          <circle
            cx="260"
            cy="150"
            r="10"
            fill={accentHex}
            fillOpacity="0.18"
            stroke={accentHex}
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRAGOON’S DISPATCH · BATCH TOKEN DISTRIBUTION
          </text>
        </svg>
      );

    case "vault-mechanism":
      return (
        <svg
          viewBox="0 0 400 220"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Vault mechanism graphic for ${title}`}
        >
          <rect width="400" height="220" className="fill-slate-100 dark:fill-[#0c0a06]" />
          <circle
            cx="200"
            cy="95"
            r="48"
            stroke={accentHex}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeOpacity="0.5"
          />
          <circle
            cx="200"
            cy="95"
            r="34"
            fill={accentHex}
            fillOpacity="0.12"
            stroke={accentHex}
            strokeWidth="1.5"
          />
          <circle cx="200" cy="95" r="8" fill={accentHex} fillOpacity="0.4" />
          <line
            x1="200"
            y1="95"
            x2="220"
            y2="80"
            stroke={accentHex}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="80"
            y1="165"
            x2="320"
            y2="165"
            stroke={accentHex}
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <circle cx="160" cy="165" r="4" fill={accentHex} />
          <circle
            cx="320"
            cy="165"
            r="4"
            stroke={accentHex}
            strokeWidth="2"
            className="fill-white dark:fill-[#0c0a06]"
          />
          <text
            x="200"
            y="195"
            textAnchor="middle"
            fill={accentHex}
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.5"
            fontWeight="600"
          >
            DRAGOON’S VAULT · LINEAR TOKEN VESTING
          </text>
        </svg>
      );

    default:
      return null;
  }
}
