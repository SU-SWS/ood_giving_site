import { useWindowSize } from 'usehooks-ts';

export const CountdownPie = ({ children, descriptor, percent }) => {
  const { width } = useWindowSize();

  return (
    <div className="flex items-center justify-center" style={{
      background: `conic-gradient(hotpink calc(${percent} * 1%), transparent 0)`,
    }}>
      <div className="bg-white p-8">
        <span>{children}</span>
        <span>{descriptor}</span>
      </div>
    </div>
  )
};
