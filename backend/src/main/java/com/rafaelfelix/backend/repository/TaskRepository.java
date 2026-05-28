package com.rafaelfelix.backend.repository;

import com.rafaelfelix.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
