package com.rafaelfelix.backend.controller;

import com.rafaelfelix.backend.dto.TaskRequestDTO;
import com.rafaelfelix.backend.entity.Task;
import com.rafaelfelix.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService service;

    @GetMapping
    public ResponseEntity<List<Task>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody TaskRequestDTO dto) {
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .completed(dto.isCompleted())
                .build();

        Task createdTask = service.create(task);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @Valid @RequestBody TaskRequestDTO dto){
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .completed(dto.isCompleted())
                .build();

        Task updatedTask = service.update(id, task);

        return ResponseEntity.ok(updatedTask);
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> complete(@PathVariable Long id){
        Task updatedTask = service.complete(id);

        return ResponseEntity.ok(updatedTask);
    }
}
