import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--sapObjectHeader_Background);
  border-radius: 0.5rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--sapContent_LabelColor);
  margin: 0;
`;

export const ExportButton = styled.button`
  background-color: var(--sapButton_Background);
  color: var(--sapButton_TextColor);
  border: 1px solid var(--sapButton_BorderColor);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;

  &:hover {
    background-color: var(--sapButton_Hover_Background);
  }
`;

export const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--sapList_Background);
  border: 1px solid var(--sapList_BorderColor);
  border-radius: 0.5rem;
  overflow: hidden;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--sapList_BorderColor);
  }

  th {
    background: var(--sapList_HeaderBackground);
    color: var(--sapList_HeaderTextColor);
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: var(--sapList_HeaderHoverBackground);
    }
  }

  tr:hover td {
    background: var(--sapList_Hover_Background);
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  ${props => {
    switch (props.status) {
      case 'pendiente':
        return `
          background-color: var(--sapIndicationColor_1_Background);
          color: var(--sapIndicationColor_1_TextColor);
        `;
      case 'en_proceso':
        return `
          background-color: var(--sapIndicationColor_2_Background);
          color: var(--sapIndicationColor_2_TextColor);
        `;
      case 'en_transito':
        return `
          background-color: var(--sapIndicationColor_3_Background);
          color: var(--sapIndicationColor_3_TextColor);
        `;
      case 'completada':
        return `
          background-color: var(--sapIndicationColor_4_Background);
          color: var(--sapIndicationColor_4_TextColor);
        `;
      default:
        return `
          background-color: var(--sapNeutralBackground);
          color: var(--sapNeutralTextColor);
        `;
    }
  }}
`;

export const PriorityBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  ${props => {
    switch (props.priority) {
      case 'alta':
        return `
          background-color: var(--sapPriority_High_Background);
          color: var(--sapPriority_High_TextColor);
        `;
      case 'media':
        return `
          background-color: var(--sapPriority_Medium_Background);
          color: var(--sapPriority_Medium_TextColor);
        `;
      case 'baja':
        return `
          background-color: var(--sapPriority_Low_Background);
          color: var(--sapPriority_Low_TextColor);
        `;
      default:
        return `
          background-color: var(--sapNeutralBackground);
          color: var(--sapNeutralTextColor);
        `;
    }
  }}
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--sapButton_TextColor);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background: var(--sapButton_Hover_Background);
  }
`;

export const DetailDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--sapBackgroundColor);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sapList_BorderColor);

  &:last-child {
    border-bottom: none;
  }
`;

export const DetailLabel = styled.div`
  color: var(--sapContent_LabelColor);
  font-weight: 600;
`;

export const DetailValue = styled.div`
  color: var(--sapContent_TextColor);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--sapButton_TextColor);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    background: var(--sapButton_Hover_Background);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SortIcon = styled.span`
  margin-left: 0.5rem;
  opacity: ${props => props.active ? 1 : 0.3};
`;

export const TableHeader = styled.th`
  position: relative;
  padding-right: 2rem !important;

  &:after {
    content: '↕';
    position: absolute;
    right: 0.5rem;
    opacity: 0.3;
  }

  &[data-sort='asc']:after {
    content: '↑';
    opacity: 1;
  }

  &[data-sort='desc']:after {
    content: '↓';
    opacity: 1;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--sapField_BorderColor);
  border-radius: 0.25rem;
  width: 300px;
  background: var(--sapField_Background);
  color: var(--sapField_TextColor);

  &:focus {
    outline: none;
    border-color: var(--sapField_Hover_BorderColor);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--sapField_BorderColor);
  border-radius: 0.25rem;
  background: var(--sapField_Background);
  color: var(--sapField_TextColor);

  &:focus {
    outline: none;
    border-color: var(--sapField_Hover_BorderColor);
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--sapButton_BorderColor);
  background: ${props => props.active ? 'var(--sapButton_Selected_Background)' : 'var(--sapButton_Background)'};
  color: ${props => props.active ? 'var(--sapButton_Selected_TextColor)' : 'var(--sapButton_TextColor)'};
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background: var(--sapButton_Hover_Background);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
