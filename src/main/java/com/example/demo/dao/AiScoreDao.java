package com.example.demo.dao;

import com.example.demo.entity.AiScore;

import java.io.Serializable;
import java.util.List;
public interface AiScoreDao <T> extends Serializable {

    public List<T> getAll();
    List<AiScore> getWhereRrancAndRule(int tranc, int rule);

}
