import React from "react";
import type { LucideIcon } from "lucide-react";
import { TerminalIcon } from "lucide-react";

import StacksLogo from "@/public/stacks-logo.svg";

export function create({ icon: Icon }: { icon?: LucideIcon }): JSX.Element {
  return (
    <div className="rounded-md border bg-gradient-to-b from-secondary p-1 shadow-sm">
      {Icon ? <Icon /> : <TerminalIcon />}
    </div>
  );
}

type IconProps = {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function StacksIcon({
  size = 24,
  color = "currentColor",
  className,
  style,
}: IconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color, ...style }}
    >
      <svg
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.4731 4.34457C10.4676 4.34254 10.4617 4.34142 10.4556 4.34142H7.66498C7.56531 4.34142 7.47632 4.28892 7.42981 4.2017C7.38333 4.11455 7.38871 4.01181 7.44355 3.92737C7.44361 3.92727 7.44368 3.92717 7.44375 3.92706L9.26679 1.2179L9.26691 1.21772C9.30487 1.16078 9.308 1.09041 9.27647 1.03052C9.24449 0.969753 9.18331 0.934558 9.11682 0.934558H8.40359C8.34467 0.934558 8.28646 0.962411 8.2532 1.01499L6.11856 4.18809L6.11845 4.18827C6.05401 4.28493 5.94741 4.34142 5.82998 4.34142H5.56454C5.44711 4.34142 5.34051 4.28493 5.27607 4.18827L5.27598 4.18812L3.14595 1.01731C3.1127 0.964726 3.05448 0.936866 2.99554 0.936866H2.28232C2.21517 0.936866 2.15203 0.974946 2.12036 1.03513L2.1646 1.05842L2.12036 1.03513C2.08824 1.09616 2.09509 1.1662 2.12955 1.21946L2.12954 1.21946L2.13004 1.22021L3.9535 3.93L3.9535 3.93001L3.95384 3.9305C4.00968 4.01138 4.01401 4.11361 3.96702 4.2017L3.96681 4.20211C3.92013 4.29158 3.83346 4.34373 3.73185 4.34373H0.943578C0.841532 4.34373 0.762012 4.4267 0.762012 4.5253V5.11619C0.762012 5.21823 0.844983 5.29775 0.943578 5.29775H10.4556C10.5576 5.29775 10.6371 5.21478 10.6371 5.11619V4.5253C10.6371 4.42935 10.5638 4.35332 10.4731 4.34457Z"
          style={{
            fill: "currentColor",
            stroke: "currentColor",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeWidth: "0.1",
            strokeLinejoin: "round",
          }}
        />
        <path
          d="M2.13004 10.8872L2.12992 10.8873C2.09196 10.9443 2.08883 11.0147 2.12036 11.0745C2.15234 11.1353 2.21352 11.1705 2.28001 11.1705H2.99324C3.05216 11.1705 3.11038 11.1427 3.14363 11.0901L5.27827 7.91697L5.27838 7.9168C5.34282 7.82014 5.44942 7.76364 5.56685 7.76364H5.83229C5.94972 7.76364 6.05632 7.82014 6.12076 7.9168L6.12086 7.91695L8.25361 11.0907L8.25391 11.0911C8.28845 11.1414 8.34297 11.1705 8.40359 11.1705H9.11682C9.18396 11.1705 9.24711 11.1324 9.27878 11.0722C9.3109 11.0112 9.30405 10.9412 9.26959 10.8879L9.2696 10.8879L9.2691 10.8872L7.44564 8.17737L7.4453 8.17687C7.38946 8.096 7.38513 7.99377 7.43212 7.90567L7.43233 7.90527C7.47901 7.8158 7.56568 7.76364 7.66729 7.76364H10.4556C10.5576 7.76364 10.6371 7.68067 10.6371 7.58208V6.99118C10.6371 6.88914 10.5542 6.80962 10.4556 6.80962C10.4503 6.80962 10.4453 6.81043 10.4405 6.81193H0.943578C0.841532 6.81193 0.762012 6.8949 0.762012 6.99349V7.58439C0.762012 7.68643 0.844983 7.76595 0.943578 7.76595H3.73185C3.83152 7.76595 3.92051 7.81846 3.96702 7.90567C4.01364 7.99308 4.00792 8.0957 3.95342 8.17749C3.95341 8.17751 3.95339 8.17753 3.95338 8.17755L2.13004 10.8872Z"
          style={{
            fill: "currentColor",
            stroke: "currentColor",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeWidth: "0.1",
            strokeLinejoin: "round",
          }}
        />
      </svg>
    </svg>
  );
}

export function OrdinalsIcon(): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.58228"
        cy="7.05255"
        r="6.36257"
        stroke="currentColor"
        style={{
          stroke: "currentColor",
          strokeOpacity: 1,
          strokeWidth: "1.2651",
        }}
      />
      <circle
        cx="7.53107"
        cy="7.04505"
        r="3.76642"
        fill="currentColor"
        style={{
          fill: "currentColor",
          fillOpacity: 1,
        }}
      />
    </svg>
  );
}
