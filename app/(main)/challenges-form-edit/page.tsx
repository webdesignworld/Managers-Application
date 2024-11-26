"use client";

import React, { useState, useCallback, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export const deleteChallenge = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/challenges/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Challenge deleted successfully!");
      revalidatePath("/");
    } else {
      throw new Error("Failed to delete challenge.");
    }
  } catch (error) {
    alert("An error occurred while deleting the challenge.");
  }
};

const ChallengeFormEdit = ({ initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [level, setLevel] = useState(initialData?.level || "easy");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [code, setCode] = useState(initialData?.code || "");
  const [language, setLanguage] = useState(
    initialData?.language || "javascript"
  );
  const [testCases, setTestCases] = useState(initialData?.testCases || []);

  const onDescriptionChange = useCallback((value) => {
    setDescription(value);
  }, []);

  const extensions = useMemo(() => {
    return language === "javascript" ? [javascript()] : [python()];
  }, [language]);

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      {
        id: Date.now(),
        type: "number",
        name: "",
        value: "",
        output: "",
        weight: 0.5,
      },
    ]);
  };

  const handleDeleteTestCase = (id) => {
    setTestCases(testCases.filter((testCase) => testCase.id !== id));
  };

  const handleTestCaseChange = (id, field, value) => {
    setTestCases(
      testCases.map((testCase) =>
        testCase.id === id ? { ...testCase, [field]: value } : testCase
      )
    );
  };

  const handleSubmit = async () => {
    if (!title || !category || !level || !description || !code) {
      alert("All fields marked with * are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/challenges/${initialData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            category,
            level,
            description,
            code,
            language,
            testCases,
          }),
        }
      );

      if (response.ok) {
        alert("Challenge updated successfully!");
      } else {
        throw new Error("Failed to update challenge.");
      }
    } catch (error) {
      alert("An error occurred while updating the challenge.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-8 bg-gray-100">
        <h1 className="text-2xl mb-4 font-semibold mt-4">Edit Challenge</h1>

        <Label>Title*</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-4"
        />

        <Label>Category*</Label>
        <Input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="mb-4"
        />

        <Label>Level*</Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Label>Description*</Label>
        <SimpleMDE value={description} onChange={onDescriptionChange} />
      </div>

      <div className="w-1/2 p-8 bg-gray-200">
        <Label>Code*</Label>
        <CodeMirror
          value={code}
          height="100px"
          width="800px"
          extensions={extensions}
          onChange={(value) => setCode(value)}
        />

        <Button onClick={handleSubmit} className="bg-purple-500 mt-4">
          Save Changes
        </Button>

        <div className="mt-4">
          <Label>Test Cases</Label>
          <Button
            onClick={handleAddTestCase}
            className="bg-purple-500 text-white text-2xl"
          >
            <Plus />
          </Button>

          {testCases.map((testCase) => (
            <div
              key={testCase.id}
              className="border p-2 rounded flex items-center space-x-4 mt-2"
            >
              <Button
                onClick={() => handleDeleteTestCase(testCase.id)}
                className="bg-red-500 text-white"
              >
                <Trash2 />
              </Button>
              <Input
                type="text"
                placeholder="Name"
                value={testCase.name}
                onChange={(e) =>
                  handleTestCaseChange(testCase.id, "name", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeFormEdit;
