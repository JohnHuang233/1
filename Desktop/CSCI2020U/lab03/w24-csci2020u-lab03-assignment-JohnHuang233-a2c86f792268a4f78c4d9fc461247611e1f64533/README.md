# Lab 3 - REST API

CSCI 2020U: Software Systems Development and Integration

## Overview

In this lab, your initial focus will be on understanding various file formats, such as XML, JSON, and CSV. This involves understanding their structures and how they represent data.

Following this, you will proceed to create endpoints for a specific resource within your web service. These endpoints will be designed to serve the resource using three different file format representations, allowing clients to interact with the data in XML, JSON, or CSV. 

The entire process, from handling file formats to exposing the resource through endpoints, will be facilitated by the GlassFish server, which serves as the hosting environment for your web service.

## Prerequisites

Ensure your GlassFish setup is functional, as this lab is a continuation from Lab 2.

## Lab Work

### Part 1 - File Creation

Given the dataset below represented in a tabular format, your task is to transform it into other file formats.

|name|id|gpa|
|-|-|-|
|Ryan Gosling|100000000|4.3|
|Keanu Reeves|100000001|2.9|
|Richard Dean Anderson|100000002|2.7|
|Brad Pitt|100000003|3.9|
|Ed Norton|100000004|2.2|
|Helena Bonham Carter|100000005|2.0|

Convert the data above into the following formats:

- JSON
- XML
- CSV

Name each file `students` (e.g., `students.json`) and place them within `src/main/resources/`.

For the purpose of autograding, follow these formatting guidelines for each file type:

- For all 3 formats:
  - Fields for each record should be lowercase (e.g., `name` and not `NAME`)
  - Fields should be ordered as: `name`, `id`, `gpa`
  - Records should be sorted by the value of `id` from least to greatest

- For JSON:
  - All the records should be stored in an array named `students`
  - Each record should be a JSON object with following fields and value types:
    - `name` is a string
    - `id` and `gpa` are numbers
      
- For XML:
  - The parent element should be called `students`
  - Each record should be called `student`
  - Each field in a record (i.e., `name`, `id` and `gpa`) should have its own tag (e.g., `<name></name>`)
  - Include an XML header at the **beginning** of the file with following attributes:
    - version: `1.0`
    - encoding: `utf-8`
      
- For CSV: 
  - Header should be copied from the table above
  - Delimiter should be a comma

>If there is any confusion about the formatting, please refer to the lecture video and slides for Module 3 or ask your TA.

### Part 2 - Content Distribution

Implement functions to serve as endpoints for each file format. 

Utilize the **predefined function** within the `StudentResource.java` file for file reading, though you are allowed to implement your own if you so choose.

Your tasks:

1. Create the following three functions:
   - `String json();`
   - `String csv();`
   - `String xml();`
2. Use the proper [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for the `@Produces` decorator.
   - You can use `"text/plain"` to verify that the CSV endpoint works, **but** use the correct MIME type for this lab when you submit and in practice.
3. Assign an endpoint for each file format (e.g., `/api/students/json` should serve the `students.json` file)
   - Ensure the endpoint is the lowercase of the file format

The default entry point to this application is `/api/students/...`

>If there is any confusion about the endpoints, please refer to the lecture and demo video for Module 3 or ask your TA.
