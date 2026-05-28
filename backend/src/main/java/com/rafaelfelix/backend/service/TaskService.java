package com.rafaelfelix.backend.service;

import com.rafaelfelix.backend.entity.Task;
import com.rafaelfelix.backend.exception.ResourceNotFoundException;
import com.rafaelfelix.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;

    public List<Task> findAll() {
        return repository.findAll();
    }

    public Task create(Task task) {
        return repository.save(task);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Task update(Long id, Task task) {

        Task existingTask = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Tarefa não encontrada"));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setCompleted(task.isCompleted());

        return repository.save(existingTask);
    }

    public Task complete(Long id){
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task não encontrada"));

        task.setCompleted(true);

        return repository.save(task);
    }
}
