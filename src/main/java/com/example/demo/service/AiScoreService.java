package com.example.demo.service;

import com.example.demo.entity.AiScore;
import com.example.demo.repository.AiScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AiScoreService {

    @Autowired
    AiScoreRepository aiScoreRepository;

    public AiScore createAiScore(AiScore aiScore) {
        return aiScoreRepository.save(aiScore);
    }

    public List getAiScore() {
        return aiScoreRepository.findAll();
    }

    public AiScore updateAiScore(Long id, AiScore aiScore) {
        AiScore currentAiScore = aiScoreRepository.findById(id).get();
        currentAiScore.setScore(aiScore.getScore());
        currentAiScore.setCount(aiScore.getCount());
        currentAiScore.setCount(aiScore.getCount());
        currentAiScore.setTrueflg(aiScore.getTrueflg());
        currentAiScore.setTrueflg(aiScore.getTrueflg());
        currentAiScore.setTranc(aiScore.getTranc());

        return aiScoreRepository.save(currentAiScore);
    }

    public void deleteAiScore(Long id) {
        aiScoreRepository.deleteById(id);
    }

    public List<AiScore> getAiScoreByTranc(int tranc) {
        return aiScoreRepository.findByTranc(tranc);
    }

    public List<AiScore> getAiScoreByTrueflg(int trueflg) {
        return aiScoreRepository.findByTrueflg(trueflg);
    }

    public List<AiScore> getAiScoreByTrancAndRule(int tranc, int rule) {
        return aiScoreRepository.findByTrancAndRule(tranc, rule);
    }
}
