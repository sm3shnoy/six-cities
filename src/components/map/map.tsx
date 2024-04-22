import cn from 'classnames';

export const Map = ({ extraClassName }: { extraClassName?: string }) => (
  <section className={cn(extraClassName, 'map')}></section>
);
