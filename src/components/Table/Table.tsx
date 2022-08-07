import { DataGrid, GridColumns } from '@mui/x-data-grid';

interface Object {
  _id: string
}

interface Data {
  rows: Object[];
  columns: GridColumns<Object>;
  loading: boolean;
  action: Function;
}

export default function DataTable({ rows, columns, loading, action }: Data) {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        filterMode='client'
        getRowId={row => row._id}
        onRowClick={value => action(value.id)}
        loading={loading}
      />
    </div>
  );
}
