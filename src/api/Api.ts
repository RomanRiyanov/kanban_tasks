//функции фейкового вызова API
//на самом деле состояние страницы сохраняется в LocalStorage
//можно заменить только эти функции, чтобы обращаться напрямую к бэкенду
import { Columns } from "../components/Kanban/Kanban";


export const getApiData = () => {
    const storedData = localStorage.getItem("columns");
    if (storedData) {
        return JSON.parse(storedData);
    }
}

export const sendApiData = (sendData: Columns) => {
    localStorage.setItem("columns", JSON.stringify(sendData));
}