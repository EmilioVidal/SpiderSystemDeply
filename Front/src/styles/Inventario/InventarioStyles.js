import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.textColor};
  padding: 20px;

  h1 {
    margin: 0 0 20px 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  flex: 1;
  background: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;

  .rdt_Table {
    flex: 1;
  }

  .rdt_TableHead {
    background: ${({ theme }) => theme.bg3};
  }

  .rdt_TableHeader {
    background: transparent;
    min-height: unset !important;
    padding: 16px;
  }

  .rdt_TableHeadRow {
    background: ${({ theme }) => theme.bg3};
    border-radius: 8px 8px 0 0;
    min-height: 52px;
  }

  .rdt_TableBody {
    min-height: unset;
    flex: 1;
  }

  .rdt_Pagination {
    border-radius: 0 0 8px 8px;
    min-height: 52px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const TextField = styled.input`
  height: 32px;
  min-width: 200px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.gray500};
  }
`;

export const ClearButton = styled.button`
  border: none;
  height: 32px;
  width: 32px;
  padding: 0;
  margin-left: 8px;
  background: transparent;
  color: ${({ theme }) => theme.gray500};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.textColor};
  }
`;

export const ExportButton = styled.button`
  height: 32px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 4px;
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bg3};
    border-color: ${({ theme }) => theme.primary};
  }
`;