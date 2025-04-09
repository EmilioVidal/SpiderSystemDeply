import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Button,
  Table,
  TableColumn,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Icon,
  ObjectStatus,
  ValueState,
  AnalyticalTable
} from '@ui5/webcomponents-react';
import {
  LineChart,
  BarChart,
  PieChart
} from '@ui5/webcomponents-react-charts';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const Analisis_Inv = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [inventario, setInventario] = useState([]);
  const [metricas, setMetricas] = useState({
    totalProductos: 0,
    valorTotal: 0,
    productosBajoStock: 0,
    productosSobreStock: 0
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setInventario([
        {
          id: 1,
          producto: 'Producto A',
          categoria: 'Electrónicos',
          stockActual: 150,
          stockMinimo: 100,
          stockMaximo: 500,
          valorUnitario: 100,
          valorTotal: 15000,
          tendencia: 'Estable'
        },
        {
          id: 2,
          producto: 'Producto B',
          categoria: 'Muebles',
          stockActual: 50,
          stockMinimo: 100,
          stockMaximo: 300,
          valorUnitario: 200,
          valorTotal: 10000,
          tendencia: 'Bajo'
        }
      ]);

      setMetricas({
        totalProductos: 200,
        valorTotal: 25000,
        productosBajoStock: 5,
        productosSobreStock: 2
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getTendenciaColor = (tendencia) => {
    switch (tendencia) {
      case 'Alto':
        return ValueState.Success;
      case 'Estable':
        return ValueState.None;
      case 'Bajo':
        return ValueState.Error;
      default:
        return ValueState.None;
    }
  };

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Producto",
      accessor: "producto",
      width: 200
    },
    {
      Header: "Categoría",
      accessor: "categoria",
      width: 150
    },
    {
      Header: "Stock Actual",
      accessor: "stockActual",
      width: 120
    },
    {
      Header: "Valor Total",
      accessor: "valorTotal",
      width: 120,
      Cell: ({ value }) => `$${value.toLocaleString()}`
    },
    {
      Header: "Tendencia",
      accessor: "tendencia",
      width: 120,
      Cell: ({ value }) => (
        <ObjectStatus 
          state={getTendenciaColor(value)}
        >
          {value}
        </ObjectStatus>
      )
    }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
        <Title>Análisis de Inventario</Title>
        <Button icon="download">
          Exportar Análisis
        </Button>
      </FlexBox>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon name="loading" />
          <Text>Cargando análisis...</Text>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
            <Card>
              <Title level="H3">Tendencias de Stock</Title>
              <LineChart 
                dimensions={[{ accessor: 'fecha' }]}
                measures={[{ accessor: 'stockActual', label: 'Stock' }]}
                dataset={inventario}
                style={{ width: '100%', height: '300px' }}
              />
            </Card>

            <Card>
              <Title level="H3">Distribución por Categoría</Title>
              <PieChart
                dimension={{ accessor: 'categoria' }}
                measure={{ accessor: 'stockActual' }}
                dataset={inventario}
                style={{ width: '100%', height: '300px' }}
              />
            </Card>
          </div>

          <Card style={{ marginTop: '1rem' }}>
            <Title level="H3">Detalle de Inventario</Title>
            <AnalyticalTable
              data={inventario}
              columns={columns}
              visibleRows={10}
              minRows={5}
              scaleWidthMode="Smart"
              selectionMode="None"
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default Analisis_Inv; 