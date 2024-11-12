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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Trash2 } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

const ChallengesForm = () => {
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testCases, setTestCases] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

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
      const response = await fetch("http://localhost:3000/challenges", {
        method: "POST",
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
      });

      if (response.ok) {
        alert("Challenge created successfully!");
        // Clear the form
        setTitle("");
        setCategory("");
        setLevel("");
        setDescription("");
        setCode("");
        setTestCases([]);
      } else {
        throw new Error("Failed to create challenge.");
      }
    } catch (error) {
      alert("An error occurred while creating the challenge.");
    }
  };

  return (
    <>
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-8 bg-gray-100">
      
        <h1 className="text-2xl mb-4 font-semibold mt-4">
          Create new challenge
        </h1>

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
        <Select onValueChange={setLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Label className="mt-4 mb-4">Description*</Label>
        <SimpleMDE value={description} onChange={onDescriptionChange} />
        <BackButton text="Go Back" link="/" />
      </div>

      {/* Right side with code editor and test cases */}
      <div className="w-1/2 p-8 bg-gray-200">
        <Label htmlFor="functionName">Function name*</Label>
        <div className="flex items-center space-x-2 mt-1">
          <Input id="functionName" type="text" placeholder="Function name" />
          <Button onClick={handleSubmit} className="bg-purple-500">
            Create
          </Button>
        </div>

        <Label>Code*</Label>
        <CodeMirror
          value={code}
          height="100px"
          width="800px"
          extensions={extensions}
          onChange={(value) => setCode(value)}
          className="mt-1"
        />

        <div className="flex items-center gap-4 mt-4">
          <Label>Tests*</Label>
          <Button
            onClick={handleAddTestCase}
            className="bg-purple-500 text-white text-2xl"
          >
            <Plus />
          </Button>
        </div>

        <div className="space-y-2 mt-4">
          {testCases.map((testCase) => (
            <div
              key={testCase.id}
              className="border p-2 rounded flex items-center space-x-4"
            >
              {/* Delete button on the left */}
              <Button
                onClick={() => handleDeleteTestCase(testCase.id)}
                className="bg-red-500 text-white"
              >
                <Trash2 />
              </Button>

              <div className="flex flex-col flex-1 space-y-2">
                {/* Row of fields for Type, Name, Output, Weight */}
                <div className="flex items-center space-x-4">
                  {/* Type Selector */}
                  <div className="flex-1">
                    <Label>Type</Label>
                    <Select
                      onValueChange={(value) =>
                        handleTestCaseChange(testCase.id, "type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={testCase.type} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="string">String</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name Input */}
                  <div className="flex-1">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={testCase.name}
                      onChange={(e) =>
                        handleTestCaseChange(
                          testCase.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Output Input */}
                  <div className="flex-1">
                    <Label>Output</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="1"
                      value={testCase.output}
                      onChange={(e) =>
                        handleTestCaseChange(
                          testCase.id,
                          "output",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Weight Input */}
                  <div className="flex-1">
                    <Label>Weight</Label>
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={testCase.weight}
                      onChange={(e) =>
                        handleTestCaseChange(
                          testCase.id,
                          "weight",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>

                {/* Value Input on a new line */}
                <div>
                  <Label>Value</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    value={testCase.value}
                    onChange={(e) =>
                      handleTestCaseChange(testCase.id, "value", e.target.value)
                    }
                  />

              
                </div>
              </div>
            </div>
          ))}
        </div>  
      </div>    
    </div>
    </>
  );
};

export default ChallengesForm;
