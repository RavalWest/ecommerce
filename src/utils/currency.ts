export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(value);
};
