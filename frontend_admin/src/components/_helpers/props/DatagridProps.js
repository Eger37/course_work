export const DatagridWithBlockProps = {
    rowStyle: (record, index) => {
        return {
            backgroundColor: record.is_blocked && "silver",
        };
    }
};