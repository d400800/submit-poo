import React from 'react';

import {DragDropContext, Draggable} from 'react-beautiful-dnd';
import {create} from 'zustand';

import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';

import {StrictModeDroppable as Droppable} from './StrictModeDroppable';

const DraggableList = ({initialItems, onChange, fieldName}) => {
    const useDraggableListStore = create((set) => ({
        items: initialItems,
        onItemDragEnd: (result) => {
            if (!result.destination) return;

            set((state) => {
                const updatedItems = [...state.items];
                const [removed] = updatedItems.splice(result.source.index, 1);

                updatedItems.splice(result.destination.index, 0, removed);

                // Notify the parent component about the updated items
                onChange(updatedItems, fieldName);

                return {items: updatedItems};
            });
        }
    }));

    const {items, onItemDragEnd} = useDraggableListStore();

    return (
        <DragDropContext onDragEnd={onItemDragEnd}>
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
                                            backgroundColor: `${item.isCorrect ? 'success.light' : 'transparent'}`
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