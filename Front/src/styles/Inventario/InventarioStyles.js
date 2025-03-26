import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  flex: 1;
`;

export const TableWrapper = styled.div`
  width: 100%;
  flex: 1;
  background: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  overflow: auto;
`;

export const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  margin-left: -1px;

  &:hover {
    background-color: #d4d4d4;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const ExportButton = styled.button`
  background-color: #f5f5f5;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #28a745;
    color: #fff;
  }
`;