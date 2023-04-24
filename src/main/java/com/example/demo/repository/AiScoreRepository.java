package com.example.demo.repository;

import com.example.demo.entity.AiScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiScoreRepository extends JpaRepository<AiScore, Long> {
    List<AiScore> findByTranc(int tranc);
    List<AiScore> findByTrueflg(int trueflg);
    List<AiScore> findByTrancAndRule(int tranc, int rule);
}
