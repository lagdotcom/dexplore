import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ContextMenuState = { type: "new"; x: number; y: number };

export type DialogState =
  | { type: "newBackdrop"; x: number; y: number }
  | { type: "newToken"; x: number; y: number };

export type PositionState = { x: number; y: number; z: number };

type AppState = {
  contextMenu?: ContextMenuState;
  dialog?: DialogState;
  dragging?: string;
  position: PositionState;
};

const initialState: AppState = { position: { x: 0, y: 0, z: 1 } };

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openContextMenu(state, { payload }: PayloadAction<ContextMenuState>) {
      state.contextMenu = payload;
    },
    closeContextMenu(state) {
      state.contextMenu = undefined;
    },

    openDialog(state, { payload }: PayloadAction<DialogState>) {
      state.dialog = payload;
    },
    closeDialog(state) {
      state.dialog = undefined;
    },

    setDragging(state, { payload }: PayloadAction<string | undefined>) {
      state.dragging = payload;
    },

    setPosition(state, { payload }: PayloadAction<PositionState>) {
      state.position.x = payload.x;
      state.position.y = payload.y;
      state.position.z = payload.z;
    },
  },
});

export const {
  closeContextMenu,
  closeDialog,
  openContextMenu,
  openDialog,
  setDragging,
  setPosition,
} = slice.actions;
export default slice.reducer;
