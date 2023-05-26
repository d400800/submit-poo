import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import {StrictModeDroppable as Droppable} from './StrictModeDroppable';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";

const DraggableList = ({initialItems, onChange, fieldName}) => {
    const [items, setItems] = useState(initialItems);

    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedItems = [...items];
        const [removed] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, removed);

        setItems(updatedItems);

        onChange(updatedItems, fieldName);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="draggable-list">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <ListItem
                                        divider
                                        dense
                                        sx={{
                                            backgroundColor: `${item.isCorrect ? 'success.light' : 'transparent'}`,
                                        }}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={item.content}/>
                                        </ListItemButton>
                                    </ListItem >
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
