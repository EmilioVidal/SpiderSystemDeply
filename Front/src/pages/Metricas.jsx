import React, { useState, useContext } from "react";
import { ThemeContext } from "../App";
import UI5ThemeProvider from "../components/UI5ThemeProvider";
import { MdOutlineInsights, MdCalendarToday, MdFilterList, MdTrendingUp, MdTrendingDown, MdPerson, MdShoppingBag, MdAttachMoney, MdStore, MdBarChart } from "react-icons/md";
import {
  Container,
  PageHeader,
  PageTitle,
  FiltersArea,
  FilterItem,
  FilterSelect,
  ContentArea,
  MetricsGrid,
  MetricCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  FooterText,
  MetricValue,
  MetricInfo,
  RowContainer,
  ChartCard,
  ChartContent,
  TableContent,
  StoreTable,
  ProgressContainer,
  ProgressBar,
  ProgressLabel,
  BarChart,
  BarGroup,
  BarLabel,
  BarContainer,
  Bar,
  BarValue,
  DonutContainer,
  Donut,
  DonutSegment,
  DonutLabel,
  DonutValue,
  DonutText,
  DonutLegend,
  LegendItem,
  LegendColor,
  LegendText,
  LineChart,
  LineChartHeader,
  LineChartContent,
  TrendRow,
  TrendName,
  TrendBarContainer,
  TrendBar,
  TrendValue,
  TrendChange,
  KpiGrid,
  KpiItem,
  KpiLabel,
  KpiValue,
  KpiTrend
} from "../styles/Metricas/MetricasStyle.js";

export function Metricas() {
  const { theme } = useContext(ThemeContext);
  const isDarkTheme = theme === "dark";
  const [timeRange, setTimeRange] = useState("month");
  const [selectedView, setSelectedView] = useState("general");

  // Función para renderizar la vista general
  const renderGeneralView = () => (
    <>
      <MetricsGrid>
        <MetricCard>
          <CardHeader>
            <CardTitle>Ventas Totales</CardTitle>
            <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$1,254,780</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+8.5% vs período anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Modelo más vendido: <strong>Zapatillas Runner Pro</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Ganancias</CardTitle>
            <MdAttachMoney size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$376,434</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+12.3% vs período anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Margen promedio: <strong>30.0%</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Clientes Nuevos</CardTitle>
            <MdPerson size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>842</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+5.2% vs período anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Tasa de conversión: <strong>4.8%</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Ticket Promedio</CardTitle>
            <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$85.40</MetricValue>
            <MetricInfo positive={false}>
              <MdTrendingDown />
              <span>-2.1% vs período anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Productos por venta: <strong>1.8</strong></FooterText>
          </CardFooter>
        </MetricCard>
      </MetricsGrid>

      {/* Resto de la vista general */}
      <RowContainer>
        <ChartCard style={{ flex: 2 }}>
          <CardHeader>
            <CardTitle>Ventas por Categoría</CardTitle>
          </CardHeader>
          <ChartContent>
            <BarChart>
              {salesByCategory.map(category => (
                <BarGroup key={category.name}>
                  <BarLabel>{category.name}</BarLabel>
                  <BarContainer>
                    <Bar 
                      width={`${(category.sales / maxCategorySales) * 100}%`}
                      color={getCategoryColor(category.name)}
                    >
                      <BarValue>${category.sales.toLocaleString()}</BarValue>
                    </Bar>
                  </BarContainer>
                </BarGroup>
              ))}
            </BarChart>
          </ChartContent>
        </ChartCard>

        <ChartCard style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Distribución de Ventas</CardTitle>
          </CardHeader>
          <ChartContent>
            <DonutContainer>
              <Donut>
                {salesChannels.map((channel, index) => (
                  <DonutSegment 
                    key={channel.name}
                    percentage={channel.percentage}
                    color={getChannelColor(channel.name)}
                    index={index}
                    count={salesChannels.length}
                  />
                ))}
                <DonutLabel>
                  <DonutValue>14,680</DonutValue>
                  <DonutText>Ventas Totales</DonutText>
                </DonutLabel>
              </Donut>
              <DonutLegend>
                {salesChannels.map(channel => (
                  <LegendItem key={channel.name}>
                    <LegendColor color={getChannelColor(channel.name)} />
                    <LegendText>{channel.name} ({channel.percentage}%)</LegendText>
                  </LegendItem>
                ))}
              </DonutLegend>
            </DonutContainer>
          </ChartContent>
        </ChartCard>
      </RowContainer>
    </>
  );

  // Función para renderizar la vista de ventas
  const renderVentasView = () => (
    <>
      <MetricsGrid>
        <MetricCard>
          <CardHeader>
            <CardTitle>Ventas del Día</CardTitle>
            <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$42,850</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+15.2% vs ayer</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Transacciones: <strong>486</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Ventas Online</CardTitle>
            <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$18,420</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+22.4% vs ayer</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Pedidos: <strong>215</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Ventas en Tienda</CardTitle>
            <MdStore size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$24,430</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+10.5% vs ayer</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Visitas: <strong>842</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Devoluciones</CardTitle>
            <MdShoppingBag size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$2,450</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingDown />
              <span>-8.3% vs ayer</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Cantidad: <strong>12</strong></FooterText>
          </CardFooter>
        </MetricCard>
      </MetricsGrid>

      <RowContainer>
        <ChartCard>
          <CardHeader>
            <CardTitle>Rendimiento por Sucursal</CardTitle>
          </CardHeader>
          <TableContent>
            <StoreTable>
              <thead>
                <tr>
                  <th>Sucursal</th>
                  <th>Ventas</th>
                  <th>Tasa Conversión</th>
                  <th>Ticket Promedio</th>
                  <th>Cumplimiento Metas</th>
                </tr>
              </thead>
              <tbody>
                {storePerformance.map(store => (
                  <tr key={store.name}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MdStore size={18} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
                        {store.name}
                      </div>
                    </td>
                    <td>${store.sales.toLocaleString()}</td>
                    <td>{store.conversionRate}%</td>
                    <td>${store.avgTicket}</td>
                    <td>
                      <ProgressContainer>
                        <ProgressBar width={store.goalCompletion}>
                          <ProgressLabel>{store.goalCompletion}%</ProgressLabel>
                        </ProgressBar>
                      </ProgressContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StoreTable>
          </TableContent>
        </ChartCard>
      </RowContainer>
    </>
  );

  // Función para renderizar la vista de clientes
  const renderClientesView = () => (
    <>
      <MetricsGrid>
        <MetricCard>
          <CardHeader>
            <CardTitle>Clientes Activos</CardTitle>
            <MdPerson size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>15,842</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+12.5% este mes</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Compras recurrentes: <strong>68%</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Satisfacción</CardTitle>
            <MdPerson size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>4.8/5.0</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+0.2 vs mes anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Reseñas positivas: <strong>92%</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Programa Lealtad</CardTitle>
            <MdPerson size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>8,456</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+245 nuevos miembros</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Tasa de redención: <strong>45%</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Tiempo Promedio</CardTitle>
            <MdPerson size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>18.5 min</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingDown />
              <span>-2.3 min vs mes anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Atención al cliente: <strong>95% satisfacción</strong></FooterText>
          </CardFooter>
        </MetricCard>
      </MetricsGrid>

      <RowContainer>
        <ChartCard style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Segmentación de Clientes</CardTitle>
          </CardHeader>
          <ChartContent>
            <DonutContainer>
              <Donut>
                {clientSegments.map((segment, index) => (
                  <DonutSegment 
                    key={segment.name}
                    percentage={segment.percentage}
                    color={getSegmentColor(segment.name)}
                    index={index}
                    count={clientSegments.length}
                  />
                ))}
                <DonutLabel>
                  <DonutValue>15,842</DonutValue>
                  <DonutText>Clientes Totales</DonutText>
                </DonutLabel>
              </Donut>
              <DonutLegend>
                {clientSegments.map(segment => (
                  <LegendItem key={segment.name}>
                    <LegendColor color={getSegmentColor(segment.name)} />
                    <LegendText>{segment.name} ({segment.percentage}%)</LegendText>
                  </LegendItem>
                ))}
              </DonutLegend>
            </DonutContainer>
          </ChartContent>
        </ChartCard>

        <ChartCard style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Principales KPIs de Clientes</CardTitle>
          </CardHeader>
          <ChartContent>
            <KpiGrid>
              <KpiItem>
                <KpiLabel>Retención</KpiLabel>
                <KpiValue>76.5%</KpiValue>
                <KpiTrend positive>+3.2%</KpiTrend>
              </KpiItem>
              <KpiItem>
                <KpiLabel>NPS</KpiLabel>
                <KpiValue>62</KpiValue>
                <KpiTrend positive>+4 pts</KpiTrend>
              </KpiItem>
              <KpiItem>
                <KpiLabel>CLV</KpiLabel>
                <KpiValue>$850</KpiValue>
                <KpiTrend positive>+$45</KpiTrend>
              </KpiItem>
              <KpiItem>
                <KpiLabel>Churn Rate</KpiLabel>
                <KpiValue>3.2%</KpiValue>
                <KpiTrend positive>-0.5%</KpiTrend>
              </KpiItem>
            </KpiGrid>
          </ChartContent>
        </ChartCard>
      </RowContainer>
    </>
  );

  // Función para renderizar la vista de marketing
  const renderMarketingView = () => (
    <>
      <MetricsGrid>
        <MetricCard>
          <CardHeader>
            <CardTitle>ROI Marketing</CardTitle>
            <MdBarChart size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>320%</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+40% vs mes anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Inversión total: <strong>$45,000</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>CAC</CardTitle>
            <MdBarChart size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>$28.50</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingDown />
              <span>-15% vs mes anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Nuevos clientes: <strong>842</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Conversión Email</CardTitle>
            <MdBarChart size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>24.8%</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+3.2% vs mes anterior</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Emails enviados: <strong>25,420</strong></FooterText>
          </CardFooter>
        </MetricCard>

        <MetricCard>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <MdBarChart size={24} color={isDarkTheme ? "#61dafb" : "#0854a0"} />
          </CardHeader>
          <CardContent>
            <MetricValue>45.2K</MetricValue>
            <MetricInfo positive={true}>
              <MdTrendingUp />
              <span>+2.8K seguidores</span>
            </MetricInfo>
          </CardContent>
          <CardFooter>
            <FooterText>Engagement rate: <strong>4.8%</strong></FooterText>
          </CardFooter>
        </MetricCard>
      </MetricsGrid>

      <RowContainer>
        <ChartCard style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Efectividad de Campañas</CardTitle>
          </CardHeader>
          <ChartContent>
            <BarChart>
              {marketingCampaigns.map(campaign => (
                <BarGroup key={campaign.name}>
                  <BarLabel>{campaign.name}</BarLabel>
                  <BarContainer>
                    <Bar 
                      width={`${(campaign.conversion / maxCampaignConversion) * 100}%`}
                      color={getCampaignColor(campaign.conversion)}
                    >
                      <BarValue>{campaign.conversion}%</BarValue>
                    </Bar>
                  </BarContainer>
                </BarGroup>
              ))}
            </BarChart>
          </ChartContent>
        </ChartCard>

        <ChartCard style={{ flex: 1 }}>
          <CardHeader>
            <CardTitle>Distribución de Inversión</CardTitle>
          </CardHeader>
          <ChartContent>
            <DonutContainer>
              <Donut>
                {marketingChannels.map((channel, index) => (
                  <DonutSegment 
                    key={channel.name}
                    percentage={channel.percentage}
                    color={getMarketingChannelColor(channel.name)}
                    index={index}
                    count={marketingChannels.length}
                  />
                ))}
                <DonutLabel>
                  <DonutValue>$45,000</DonutValue>
                  <DonutText>Inversión Total</DonutText>
                </DonutLabel>
              </Donut>
              <DonutLegend>
                {marketingChannels.map(channel => (
                  <LegendItem key={channel.name}>
                    <LegendColor color={getMarketingChannelColor(channel.name)} />
                    <LegendText>{channel.name} ({channel.percentage}%)</LegendText>
                  </LegendItem>
                ))}
              </DonutLegend>
            </DonutContainer>
          </ChartContent>
        </ChartCard>
      </RowContainer>
    </>
  );

  return (
    <UI5ThemeProvider>
      <Container>
        <PageHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MdOutlineInsights size={28} />
            <PageTitle>Métricas de Rendimiento</PageTitle>
          </div>
        </PageHeader>

        <FiltersArea>
          <FilterItem>
            <span><MdCalendarToday /> Período:</span>
            <FilterSelect value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último año</option>
            </FilterSelect>
          </FilterItem>
          <FilterItem>
            <span><MdFilterList /> Vista:</span>
            <FilterSelect value={selectedView} onChange={(e) => setSelectedView(e.target.value)}>
              <option value="general">General</option>
              <option value="ventas">Ventas</option>
              <option value="clientes">Clientes</option>
              <option value="marketing">Marketing</option>
            </FilterSelect>
          </FilterItem>
        </FiltersArea>

        <ContentArea>
          {selectedView === "general" && renderGeneralView()}
          {selectedView === "ventas" && renderVentasView()}
          {selectedView === "clientes" && renderClientesView()}
          {selectedView === "marketing" && renderMarketingView()}
        </ContentArea>
      </Container>
    </UI5ThemeProvider>
  );
}

// Datos de ejemplo
const salesByCategory = [
  { name: "Calzado Deportivo", sales: 425640, color: "#4caf50" },
  { name: "Calzado Casual", sales: 338790, color: "#2196f3" },
  { name: "Calzado Formal", sales: 287320, color: "#673ab7" },
  { name: "Calzado para Playa", sales: 203030, color: "#ff9800" }
];

const maxCategorySales = Math.max(...salesByCategory.map(cat => cat.sales));

const salesChannels = [
  { name: "Tienda Física", percentage: 62 },
  { name: "Online", percentage: 28 },
  { name: "Mayoristas", percentage: 10 }
];

const storePerformance = [
  { name: "Tienda Principal", sales: 542680, conversionRate: 8.4, avgTicket: 92.50, goalCompletion: 98 },
  { name: "Tienda Polanco", sales: 327450, conversionRate: 7.6, avgTicket: 88.30, goalCompletion: 87 },
  { name: "Tienda Santa Fe", sales: 215240, conversionRate: 6.8, avgTicket: 78.40, goalCompletion: 76 },
  { name: "Outlet Perisur", sales: 169410, conversionRate: 9.2, avgTicket: 75.20, goalCompletion: 105 }
];

const seasonalTrends = [
  { name: "Zapatillas Minimalistas", interest: 78, change: 12 },
  { name: "Sandalias Ecológicas", interest: 65, change: 24 },
  { name: "Calzado Deportivo Ligero", interest: 82, change: 8 },
  { name: "Botas Impermeables", interest: 45, change: -5 },
  { name: "Mocasines Casuales", interest: 58, change: 3 }
];

// Datos adicionales para las nuevas vistas
const clientSegments = [
  { name: "Premium", percentage: 15 },
  { name: "Regular", percentage: 45 },
  { name: "Ocasional", percentage: 30 },
  { name: "Nuevo", percentage: 10 }
];

const marketingCampaigns = [
  { name: "Campaña Verano", conversion: 24.5 },
  { name: "Descuento Flash", conversion: 32.8 },
  { name: "Programa Lealtad", conversion: 18.4 },
  { name: "Email Marketing", conversion: 15.2 },
  { name: "Social Media", conversion: 22.6 }
];

const maxCampaignConversion = Math.max(...marketingCampaigns.map(campaign => campaign.conversion));

const marketingChannels = [
  { name: "Social Media", percentage: 35 },
  { name: "Email", percentage: 25 },
  { name: "SEM", percentage: 20 },
  { name: "Display", percentage: 15 },
  { name: "Otros", percentage: 5 }
];

// Funciones auxiliares para colores
const getCategoryColor = (categoryName) => {
  switch(categoryName) {
    case "Calzado Deportivo": return "#4caf50";
    case "Calzado Casual": return "#2196f3";
    case "Calzado Formal": return "#673ab7";
    case "Calzado para Playa": return "#ff9800";
    default: return "#9e9e9e";
  }
};

const getChannelColor = (channelName) => {
  switch(channelName) {
    case "Tienda Física": return "#4caf50";
    case "Online": return "#2196f3";
    case "Mayoristas": return "#ff9800";
    default: return "#9e9e9e";
  }
};

const getTrendColor = (interest) => {
  if (interest >= 75) return "#4caf50";
  if (interest >= 50) return "#2196f3";
  return "#ff9800";
};

// Funciones auxiliares adicionales para colores
const getSegmentColor = (segmentName) => {
  switch(segmentName) {
    case "Premium": return "#4caf50";
    case "Regular": return "#2196f3";
    case "Ocasional": return "#ff9800";
    case "Nuevo": return "#9c27b0";
    default: return "#9e9e9e";
  }
};

const getCampaignColor = (conversion) => {
  if (conversion >= 30) return "#4caf50";
  if (conversion >= 20) return "#2196f3";
  if (conversion >= 10) return "#ff9800";
  return "#f44336";
};

const getMarketingChannelColor = (channelName) => {
  switch(channelName) {
    case "Social Media": return "#4caf50";
    case "Email": return "#2196f3";
    case "SEM": return "#ff9800";
    case "Display": return "#9c27b0";
    default: return "#9e9e9e";
  }
};