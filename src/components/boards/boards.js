import React, {useState} from "react";
import "./boards.scss"

const Boards = () => {
    const [boards, setBoards] = useState(
        [
            {id: 1, num: 1, title: 'Сделать', items: [{id: 0, title: 'Eat'},{id: 1, title: 'Sleep'},{id: 2, title: 'Walk on the park'}]},
            {id: 2, num: 2, title: 'В процессе', items: [{id: 0, title: 'Read Book'},{id: 1, title: 'Watch TV'},{id: 2, title: 'Cooking'}]},
            {id: 3, num: 3, title: 'Готово', items: [{id: 0, title: 'Dancing'},{id: 1, title: 'Reed Newspaper'},{id: 2, title: 'Gym'}]}
        ]
    );

    let [maxId, setMaxId] = useState(4)
    let [maxNum, setMaxNum] = useState(4)
    const [currentBoard, setCurrentBoard] = useState()
    const [currentItem, setCurrentItem] = useState()
    // Ниже идут методы для использования dragAndDrop'a
    function dragStartHandler(event, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragCardStartHandler(event, board) {
        setCurrentBoard(board)
    }

    function dragEndHandler(event) {
        event.target.style.boxShadow = 'none'
    }

    function dropHandler(event, board) {
        event.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

        setBoards(boards.map(i => {
            if(i.id === board.id){
                return board
            }

            if(i.id === currentBoard.id){
                return currentBoard
            }
            return i
        }))

        setBoards(boards.map(i => {
            if(i.id === board.id){
                return {...i, num: currentBoard.num}
            }

            if(i.id === currentBoard.id){
                return {...i, num: board.num}
            }
            return i
        }))
    }

    function dragOverHandler(event) {
        event.preventDefault()
        event.target.style.boxShadow = '0 4px 3px gray'
    }

    function dragLeaveHandler(event) {
        event.target.style.boxShadow = 'none'
    }

    function dropCardHandler(event, board, item) {
        event.preventDefault()
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

        setBoards(boards.map(i => {
            if(i.id === board.id){
                return board
            }

            if(i.id === currentBoard.id){
                return currentBoard
            }
            return i
        }))
        event.target.style.boxShadow = 'none'

    }

    function dragCardEndHandler(event) {
        return undefined
    }

    function dragCardLeaveHandler(event) {
        return undefined;
    }

    function dragOverCardHandler(event) {
        event.preventDefault()
    }

    // Ниже основные функции нужного функционала
    const sortCard = (start, end) => {
        if(start.num > end.num){
            return 1
        }else {
            return -1
        }
    }

    const addBoard = () => {
        setMaxId(maxId + 1)
        setMaxNum(maxNum + 1)
      let newItemBoard = {
          id: maxId,
          num: maxNum,
          title: 'Напишите тут заголовок',
          items: []
      }
     setBoards([...boards, newItemBoard])
     console.log(boards)
    }

    const deleteBoard = (event, board) => {
        const index = boards.findIndex(elem => elem.id === board.id)
        const newArr = [...boards.slice(0, index), ...boards.slice(index + 1)]
        setBoards(newArr)

    }

    const deleteTicket = (event, board, item) => {
        const items = board.items
        const index = items.findIndex(i => i.id === item.id)
        board.items = [...board.items.slice(0, index), ...board.items.slice(index + 1)]
        setBoards([...boards])
    }

    const sendTicketToBoard = (event, board) => {
        const inputs = document.querySelectorAll('.board__send_input')
        let valueOfMessage
        inputs.forEach((item, i) => {
            if(item.value !== ''){
                valueOfMessage = item.value
                item.value = ''
            }
        })
        inputs.value = ''
        setMaxId(maxId + 1)
        let newItemTicket = {
            id: maxId,
            title: valueOfMessage
        }
        board.items.push(newItemTicket)
        setBoards([...board, newItemTicket])
    }

    return(
        <div className="main">
            <button className="button" onClick={addBoard}>Добавить доску</button>
            {boards.sort(sortCard).map(board =>             // Динамическая отрисовка данных
                <div
                    className='board'
                    onDragStart={event => dragCardStartHandler(event, board)}
                    onDragEnd={event => dragCardEndHandler(event)}
                    onDragLeave={event => dragCardLeaveHandler(event)}
                    onDragOver={event => dragOverCardHandler(event)}
                    onDrop={event => dropCardHandler(event, board)}
                >
                    <div className="board__title" contentEditable={true} suppressContentEditableWarning={true}>
                        {board.title}
                    </div>

                    {board.items.map(item =>
                        <div
                            draggable={true}
                            onDragStart={event => dragStartHandler(event, board, item)}
                            onDragLeave={event => dragLeaveHandler(event)}
                            onDragOver={event => dragOverHandler(event)}
                            onDragEnd={event => dragEndHandler()}
                            onDrop={event => dropHandler(event, board, item)}
                            className='board__item'
                        >
                            {item.title}
                            <button className="board__item_del" onClick={event => deleteTicket(event, board, item)}>&#9587;</button>
                        </div>)}
                    <div className="board__send">
                        <input type="text" className="board__send_input" placeholder="Введите тут заголовок тикета"/>
                        <button className="board__send_btn" onClick={event => sendTicketToBoard(event, board)}>&#10004;</button>
                    </div>
                    <button className="board__delete" onClick={event => deleteBoard(event, board)}>Удалить доску &#128465;</button>
                </div>

            )}
        </div>
    )
}

export default Boards