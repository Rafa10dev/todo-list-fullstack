package com.rafaelfelix.backend.service;

import com.rafaelfelix.backend.entity.Task;
import com.rafaelfelix.backend.entity.User;
import com.rafaelfelix.backend.exception.ResourceNotFoundException;
import com.rafaelfelix.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository repository;
    private final UserService userService;

    public List<Task> findAll() {
        User authenticatedUser = userService.getAuthenticatedUser();

        return repository.findByUser(authenticatedUser);
    }

    public Task create(Task task) {
        User authenticatedUser = userService.getAuthenticatedUser();
        task.setUser(authenticatedUser);

        return repository.save(task);
    }

    public void delete(Long id) {
        User authenticatedUser = userService.getAuthenticatedUser();

        Task task = repository.findByIdAndUser(id, authenticatedUser).orElseThrow(() ->
                new ResourceNotFoundException("Task não encontrada"));

        repository.delete(task);
    }

    public Task update(Long id, Task task) {
        User authenticatedUser = userService.getAuthenticatedUser();

        Task existingTask = repository.findByIdAndUser(id, authenticatedUser).orElseThrow(() ->
                new ResourceNotFoundException("Task não encontrada"));

        existingTask.setTitle(task.getTitle());
        existingTask.setDescription(task.getDescription());
        existingTask.setCompleted(task.isCompleted());

        return repository.save(existingTask);
    }

    public Task complete(Long id){
        User authenticatedUser = userService.getAuthenticatedUser();

        Task task = repository.findByIdAndUser(id, authenticatedUser)
                .orElseThrow(() -> new ResourceNotFoundException("Task não encontrada"));

        task.setCompleted(true);

        return repository.save(task);
    }
}
