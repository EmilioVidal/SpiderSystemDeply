import React, { useState, useEffect } from 'react';
import { Card, Title, Text, FlexBox, FlexBoxJustifyContent, FlexBoxAlignItems, FlexBoxDirection, AnalyticalTable, Button, Icon, Label, ObjectStatus, ValueState } from '@ui5/webcomponents-react';
import { LineChart, BarChart, PieChart } from '@ui5/webcomponents-react-charts';
import { spacing } from '@ui5/webcomponents-react-base';
import { useNavigate } from 'react-router-dom';
import "@ui5/webcomponents-icons/dist/AllIcons.js";

const Metricas = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    ventas: [],
    inventario: [],
    proveedores: [],
    compras: []
  });

  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      setMetrics({
        ventas: [
          { mes: 'Enero', valor: 150000 },
          { mes: 'Febrero', valor: 180000 },
          { mes: 'Marzo', valor: 220000 },
          { mes: 'Abril', valor: 190000 },
          { mes: 'Mayo', valor: 250000 }
        ],
        inventario: [
          { producto: 'Producto A', stock: 150, minimo: 50 },
          { producto: 'Producto B', stock: 200, minimo: 100 },
          { producto: 'Producto C', stock: 75, minimo: 30 }
        ],
        proveedores: [
          { nombre: 'Proveedor 1', rating: 4.5, pedidos: 25 },
          { nombre: 'Proveedor 2', rating: 3.8, pedidos: 18 },
          { nombre: 'Proveedor 3', rating: 4.2, pedidos: 30 }
        ],
        compras: [
          { mes: 'Enero', valor: 80000 },
          { mes: 'Febrero', valor: 95000 },
          { mes: 'Marzo', valor: 110000 },
          { mes: 'Abril', valor: 90000 },
          { mes: 'Mayo', valor: 120000 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleExport = () => {
    // Lógica para exportar métricas
    console.log('Exportando métricas...');
  };

  // Definir las columnas para la tabla analítica
  const columns = [
    {
      Header: "Producto",
      accessor: "producto"
    },
    {
      Header: "Stock Actual",
      accessor: "stockActual"
    },
    {
      Header: "Stock Mínimo",
      accessor: "stockMinimo"
    },
    {
      Header: "Estado",
      accessor: "estado",
      Cell: ({ value }) => (
        <ObjectStatus 
          state={value === "Bajo" ? ValueState.Error : value === "Óptimo" ? ValueState.Success : ValueState.Warning}
        >
          {value}
        </ObjectStatus>
      )
    }
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <FlexBox justifyContent={FlexBoxJustifyContent.SpaceBetween} alignItems={FlexBoxAlignItems.Center}>
        <Title>Métricas del Sistema</Title>
        <Button icon="download" onClick={handleExport}>
          Exportar
        </Button>
      </FlexBox>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Icon name="loading" />
          <Text>Cargando métricas...</Text>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          {/* Gráfico de Ventas */}
          <Card>
            <Title>Ventas Mensuales</Title>
            <LineChart
              dimensions={[{ accessor: 'mes' }]}
              measures={[{ accessor: 'valor', label: 'Ventas' }]}
              dataset={metrics.ventas}
              style={{ width: '100%', height: '300px' }}
            />
          </Card>

          {/* Gráfico de Inventario */}
          <Card>
            <Title>Estado del Inventario</Title>
            <BarChart
              dimensions={[{ accessor: 'producto' }]}
              measures={[
                { accessor: 'stock', label: 'Stock Actual' },
                { accessor: 'minimo', label: 'Stock Mínimo' }
              ]}
              dataset={metrics.inventario}
              style={{ width: '100%', height: '300px' }}
            />
          </Card>

          {/* Gráfico de Proveedores */}
          <Card>
            <Title>Rendimiento de Proveedores</Title>
            <PieChart
              dimension={{ accessor: 'nombre' }}
              measure={{ accessor: 'rating' }}
              dataset={metrics.proveedores}
              style={{ width: '100%', height: '300px' }}
            />
          </Card>

          {/* Tabla de Inventario */}
          <Card>
            <Title>Estado del Inventario</Title>
            <AnalyticalTable
              data={metrics.inventario}
              columns={columns}
              visibleRows={5}
              minRows={5}
              scaleWidthMode="Smart"
              selectionMode="None"
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Metricas; 