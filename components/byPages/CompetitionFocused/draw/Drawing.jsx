import React, {useEffect, useState} from 'react';
import CompetitionsDataService from "../../../../API/CompetitionsDataService";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import ButtonForm from "../../../UI/Buttons/ButtonForm";

const Container = styled.div`

  border: 1.5px solid #777777;
  border-radius: 1px;
  background-color: ${(props) => (props.isDragging ? "#e1e1e1" : "white")};
  display: flex;
  flex-direction: row;
`;
const FightList = styled.div`
  padding: 12px;
`;
const FightListGroup = styled.div`
  padding: 12px;
  border: 1.5px solid #777777;
  border-radius: 1px;
  background-color: ${(props) => (props.isDragging ? "#e1e1e1" : "white")};
  margin: 2px;
`;
const Fight = styled.div`
  padding: 6px;

`;
const Container1 = styled.div`
  border: 1px solid #000000;
  padding: 6px;
  margin: 6px auto;
  border-radius: 1px;
  background-color: ${(props) => ((props.count > 2) ? "#dea5a5" : (props.isDragging ? "#d7d7d7" : "#f5f5f5"))};
`;

const Drawing = ({extra, weight, mode, setLoadDraw, updateTable, array}) => {
    const [drawArray, setDrawArray] = useState(array)

    if (mode == 0) {
        return (<div>Меньше 6</div>)
    } else if (mode == 1) {
        let array = [[], []]
        for (const item of drawArray) {
            if (item.group == 1) {
                array[0].push(item)
            } else {
                array[1].push(item)
            }
        }
        const onDragEnd = async (result) => {
            // see example object in aux file.
            const {draggableId, source, destination} = result;

            // RETURN if dropped outside droppable (destination === null)
            if (!destination) return

            // RETURN if dropped back in same position
            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return
            }

            array[+source.droppableId.substring(5)][source.index].group = +destination.droppableId.substring(5) + 1
            setDrawArray(array[0].concat(array[1]))
        };

        async function applyDraw() {
            const answer = await CompetitionsDataService.patchDraw(extra, weight, 1, drawArray)
            updateTable()
        }

        return (<div>
            <ButtonForm onClick={applyDraw}>Обновить жеребьёвку</ButtonForm>
            <DragDropContext onDragEnd={onDragEnd}>
                <div key={1}>
                    <div> Группа A</div>
                    <Droppable droppableId='group0'>
                        {(provided, snapshot) => (<FightListGroup
                            ref={provided.innerRef} {...provided.droppableProps}
                        >
                            {array[0].map((item, index) => (
                                <Draggable draggableId={index.toString() + '1'} index={index}>
                                    {(provided, snapshot) => (<Container1
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        isDragging={snapshot.isDragging}
                                    >
                                        {item.person} ({item.locationCity})
                                    </Container1>)}
                                </Draggable>))}
                            {provided.placeholder}
                        </FightListGroup>)}
                    </Droppable>
                </div>
                <div key={2}>
                    <div> Группа B</div>
                    <Droppable droppableId='group1'>
                        {(provided, snapshot) => (<FightListGroup
                            ref={provided.innerRef} {...provided.droppableProps}
                        >
                            {array[1].map((item, index) => (
                                <Draggable draggableId={index.toString() + '2'} index={index}>
                                    {(provided, snapshot) => (<Container1
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        isDragging={snapshot.isDragging}
                                    >
                                        {item.person} ({item.locationCity})
                                    </Container1>)}
                                </Draggable>))}
                            {provided.placeholder}
                        </FightListGroup>)}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>);
    } else {
        let array = []
        console.log(drawArray)
        for (const item of drawArray) {
            if(item.idPerson2 == 0) {
                array.push([{
                    idPerson: item.idPerson,
                    person: item.person,
                    locationCity: item.locationCity,
                    locationRegion: item.locationRegion,
                    trainerId: item.trainerId,
                    trainerName: item.trainers
                }, {
                    idPerson: '',
                    person: '',
                    locationCity: '',
                    locationRegion: '',
                    trainerId: '',
                    trainerName: ''
                }])
            } else {
                array.push([{
                    idPerson: item.idPerson,
                    person: item.person,
                    locationCity: item.locationCity,
                    locationRegion: item.locationRegion,
                    trainerId: item.trainerId,
                    trainerName: item.trainers
                }, {
                    idPerson: item.idPerson2,
                    person: item.person2,
                    locationCity: item.locationCity2,
                    locationRegion: item.locationRegion2,
                    trainerId: item.trainerId2,
                    trainerName: item.trainers2
                }])
            }
        }
        const onDragEnd = (result) => {
            // see example object in aux file.
            const {draggableId, source, destination} = result;

            // RETURN if dropped outside droppable (destination === null)
            if (!destination) return

            // RETURN if dropped back in same position
            if (destination.droppableId === source.droppableId && destination.index === source.index) {
                return
            }

            if (result.type === 'list') {
                let moveItem = array[+source.index]
                array.splice(source.index, 1)
                array.splice(destination.index, 0, moveItem)
                return
            }

            if (result.type === 'pair') {
                let moveItem = array[+source.droppableId.substring(4)][source.index % 10]
                array[+source.droppableId.substring(4)].splice(source.index % 10, 1)
                array[+destination.droppableId.substring(4)].splice(destination.index % 10, 0, moveItem)
                return
            }


        };

        async function applyDraw() {
            await CompetitionsDataService.patchDraw(extra, weight, 2, array)
        }

        async function clearDraw() {
            const answer = await CompetitionsDataService.clearDraw(extra, weight)
            setLoadDraw()
        }

        return (<div>
            <button onClick={applyDraw}>Обновить жеребьёвку</button>
            <button onClick={clearDraw}>Очистить жеребьёвку</button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='list' type="list">
                    {(provided, snapshot) => (<FightList
                        ref={provided.innerRef} {...provided.droppableProps}
                    >
                        {array.map((item, index) => (
                            <Draggable draggableId={'list' + index.toString()} index={index} type="list">
                                {(provided, snapshot) => (<Container
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    isDragging={snapshot.isDragging}
                                    count={item.length}
                                >
                                    <div style={{
                                        width: '5%', writingMode: 'vertical-lr', padding: '8px 0px 8px 8px'
                                    }}>Встреча {index + 1}</div>
                                    <div style={{width: '95%',}}>
                                        <Droppable droppableId={'pair' + index.toString()} type="pair">
                                            {(provided, snapshot) => (<Fight
                                                ref={provided.innerRef} {...provided.droppableProps}
                                            >
                                                {item.map((e, ind) => (

                                                    <Draggable type="pair" draggableId={ind.toString() + index}
                                                               index={ind + index * 10}>
                                                        {(provided, snapshot) => (<Container1 count={item.length}
                                                                                              {...provided.draggableProps}
                                                                                              {...provided.dragHandleProps}
                                                                                              ref={provided.innerRef}
                                                                                              isDragging={snapshot.isDragging}
                                                        >
                                                            {e.person} ({e.locationCity})
                                                        </Container1>)}
                                                    </Draggable>

                                                ))}

                                                {provided.placeholder}
                                            </Fight>)}
                                        </Droppable>
                                    </div>
                                </Container>)}
                            </Draggable>))}
                        {provided.placeholder}
                    </FightList>)}
                </Droppable>
            </DragDropContext>
        </div>);

    }

};

export default Drawing;
/*
<Droppable droppableId='list' type="list">
    {(provided, snapshot) => (<FightList
        ref={provided.innerRef} {...provided.droppableProps}
    >
        {array.map((item, index) => (
            <Draggable draggableId={'list' + index.toString()} index={index} type="list">
                {(provided, snapshot) => (<Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    count={item.length}
                >
                    <div style={{
                        width: '5%', writingMode: 'vertical-lr', padding: '8px 0px 8px 8px'
                    }}>Встреча {index}</div>
                    <div style={{width: '95%',}}>
                        <Droppable droppableId={'pair' + index.toString()} type="pair">
                            {(provided, snapshot) => (<Fight
                                ref={provided.innerRef} {...provided.droppableProps}
                            >
                                {item.map((e, ind) => (

                                    <Draggable type="pair" draggableId={ind.toString() + index}
                                               index={ind + index * 10}>
                                        {(provided, snapshot) => (<Container1 count={item.length}
                                                                              {...provided.draggableProps}
                                                                              {...provided.dragHandleProps}
                                                                              ref={provided.innerRef}
                                                                              isDragging={snapshot.isDragging}
                                        >
                                            {e.person}
                                        </Container1>)}
                                    </Draggable>

                                ))}

                                {provided.placeholder}
                            </Fight>)}
                        </Droppable>
                    </div>
                </Container>)}
            </Draggable>))}
        {provided.placeholder}
    </FightList>)}
</Droppable>
</DragDropContext>*/