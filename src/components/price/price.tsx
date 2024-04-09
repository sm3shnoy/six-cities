type TPriceProps = {
  bemBlock: string;
  price: number;
};

export const Price = ({ bemBlock, price }: TPriceProps) => (
  <div className={`${bemBlock}__price`}>
    <b className={`${bemBlock}__price-value`}>€{price}</b>
    <span className={`${bemBlock}__price-text`}>&nbsp;night</span>
  </div>
);
