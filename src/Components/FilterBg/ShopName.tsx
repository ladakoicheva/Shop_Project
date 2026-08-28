type props = {
  name: string;
  color?: string;
}

export default function ShopName({ name, color }: props) {
  const isDarkColor = !color || color === 'black' || color === '#000000' || color === 'rgba(0,0,0,1)' || color === 'rgba(0, 0, 0, 1)';
  const textColor = isDarkColor ? 'var(--text-primary)' : color;

  return (
    <div className='filterBg'>
      <h1 style={{ color: textColor, margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>{name}</h1>
    </div>
  );
}