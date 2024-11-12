
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/store/editorSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageMenu = () => {
//   const dispatch = useDispatch();
  const language = useSelector((state) => state.editor.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="bg-purple-500">{language.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("javascript"))}>
          JavaScript
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("python"))}>
          Python
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;
