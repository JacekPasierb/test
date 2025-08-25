export default function StatCard(
    { title, value, hint }:
    { title: string; value: string; hint?: string }
  ) {
    return (
      <div style={{
        background:"#0b0c10", color:"#e5e7eb", border:"1px solid #1b1d22",
        borderRadius:12, padding:16, minHeight:96
      }}>
        <div style={{fontSize:12, color:"#9ca3af"}}>{title}</div>
        <div style={{fontSize:22, marginTop:6}}>{value}</div>
        {hint && <div style={{fontSize:12, color:"#9ca3af", marginTop:6}}>{hint}</div>}
      </div>
    );
  }
  