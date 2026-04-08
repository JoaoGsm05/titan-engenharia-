import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Titan Engenharia — Metalurgia de Metais Não Ferrosos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0e1322",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid técnico de fundo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(184,115,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,115,51,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Linha decorativa cobre top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #B87333, #d4956a, #B87333)",
          }}
        />

        {/* Círculo decorativo */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "1px solid rgba(184,115,51,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            border: "1px solid rgba(184,115,51,0.1)",
          }}
        />

        {/* Conteúdo principal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#B87333",
              }}
            />
            <span
              style={{
                color: "#B87333",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Engenharia Industrial
            </span>
          </div>

          {/* Título */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#dee1f7",
              lineHeight: 1,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            TITAN
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#B87333",
              lineHeight: 1,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            ENGENHARIA
          </div>
        </div>

        {/* Rodapé */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                color: "#B8C0C8",
                fontSize: "18px",
                fontWeight: 400,
                letterSpacing: "1px",
              }}
            >
              Metalurgia de Metais Não Ferrosos
            </div>
            <div
              style={{
                color: "#B8C0C8",
                opacity: 0.5,
                fontSize: "14px",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Brasil · África · América do Sul
            </div>
          </div>

          <div
            style={{
              color: "#B8C0C8",
              opacity: 0.4,
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            engenhariatitan.com
          </div>
        </div>

        {/* Linha decorativa cobre bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "rgba(184,115,51,0.2)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
