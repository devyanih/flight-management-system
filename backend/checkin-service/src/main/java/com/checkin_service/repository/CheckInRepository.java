package com.checkin_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.checkin_service.model.CheckIn;

public interface CheckInRepository extends JpaRepository<CheckIn, String> {

}

