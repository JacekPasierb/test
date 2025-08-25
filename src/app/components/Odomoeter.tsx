export default function Odometer({ km }: { km: number }) {
    return (
      <div style={{
        background:"#0b0c10", color:"#e5e7eb", border:"1px solid #1b1d22",
        borderRadius:12, padding:"12px 16px", fontFamily:"ui-monospace, monospace",
        boxShadow:"inset 0 0 0 2px #0f1115"
      }}>
        <div style={{fontSize:12, color:"#9ca3af"}}>PRZEBIEG</div>
        <div style={{fontSize:28, letterSpacing:2}}>{km.toLocaleString()} km</div>
      </div>
    );
  }
  