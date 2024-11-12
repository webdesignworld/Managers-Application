
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFontSize } from "../redux/store/editorSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FontSizeMenu = () => {
//   const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.editor.fontSize);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="bg-purple-500">Font: {fontSize}px</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[12, 14, 16, 18, 20, 22].map((size) => (
          <DropdownMenuItem key={size} onClick={() => dispatch(setFontSize(size))}>
            {size} px
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontSizeMenu;
