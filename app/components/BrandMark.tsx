/**
 * Monogramme « SN » repris du logo : lettres jaunes sur fond sombre, liseré aux
 * couleurs du drapeau sénégalais. Rendu par `next/og` (favicon, icône Apple) :
 * styles en ligne uniquement, flexbox obligatoire.
 */
export default function BrandMark({ size }: { size: number }) {
  const stripe = Math.max(4, Math.round(size * 0.12));
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#08090B',
        borderRadius: Math.round(size * 0.18),
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFC909',
          fontSize: Math.round(size * 0.56),
          fontWeight: 700,
          letterSpacing: -Math.round(size * 0.02),
        }}
      >
        SN
      </div>
      <div style={{ display: 'flex', height: stripe }}>
        <div style={{ flex: 1, background: '#00853F' }} />
        <div style={{ flex: 1, background: '#FDEF42' }} />
        <div style={{ flex: 1, background: '#E31B23' }} />
      </div>
    </div>
  );
}
