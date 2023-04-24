package com.example.demo.controller;

import com.example.demo.dao.AiScoreDaoJpql;
import com.example.demo.entity.AiScore;
import com.example.demo.service.AiScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://10.27.114.46:8000")
public class AiScoreController {

    @Autowired
    AiScoreDaoJpql dao;

    @Autowired
    AiScoreService aiScoreService;

    @RequestMapping(value="/all", method=RequestMethod.GET)
    public List<AiScore> all() {
        List<AiScore> list = dao.getAll();
        return list;
    }

    @RequestMapping(value = "/aiScore", method = RequestMethod.POST)
    public AiScore createAiScore(@RequestBody AiScore aiScore) {
        return aiScoreService.createAiScore(aiScore);
    }

    @RequestMapping(value = "/aiScore", method = RequestMethod.GET)
    public ModelAndView getAiScores() {
        List<AiScore> aiScores = aiScoreService.getAiScore();
        ModelAndView modelAndView = getModelAndView(aiScores);
        return modelAndView;
    }
    @GetMapping("/aiScore/tranc/{tranc}")
    public ModelAndView getAiScoreByTranc(@PathVariable int tranc) {
        List<AiScore> aiScores = aiScoreService.getAiScoreByTranc(tranc);
        ModelAndView modelAndView = getModelAndView(aiScores);
        return modelAndView;
    }

//    @GetMapping("/aiScore/true/{trueflg}")
    @RequestMapping(value = "/aiScore/true/{trueflg}", method = RequestMethod.POST)
    public ModelAndView  getAiScoreByTrueflg(@PathVariable int trueflg) {
        List<AiScore> aiScores =  aiScoreService.getAiScoreByTrueflg(trueflg);
        ModelAndView modelAndView = getModelAndView(aiScores);
        return modelAndView;
    }

    @RequestMapping(value = "/aiScore/{id}", method = RequestMethod.PUT)
    public AiScore updateAiScore(@PathVariable(value = "id") Long id, @RequestBody AiScore aiScore) {
        return aiScoreService.updateAiScore(id, aiScore);
    }

    @RequestMapping(value = "/aiScore/{id}", method = RequestMethod.DELETE)
    public void deleteAiScore(@PathVariable(value = "id") Long id) {
        aiScoreService.deleteAiScore(id);
    }

    @GetMapping("/aiScore/trancrule/{tranc}/{rule}")
    public ModelAndView getAiScoreByTrancAndRule(@PathVariable int tranc, @PathVariable int rule) {
        List<AiScore> aiScores = aiScoreService.getAiScoreByTrancAndRule(tranc, rule);
        ModelAndView modelAndView = getModelAndView(aiScores);
        return modelAndView;
    }
    @PostMapping("/aiScore/trancrule")
    public ModelAndView getAiScoreByTrancAndRulePost(@RequestBody Map<String, Integer> data) {
        Integer iRule = data.get("rule");
        Integer iTranc = data.get("tranc");
        iRule = (iRule == 0) ? 1 : 0;
        iTranc = (iTranc == 1) ? 0: 1;
//        AiScore[] aiScores = aiScoreService.getAiScoreByTrancAndRule(iTranc, iRule);
        List<AiScore> aiScores = dao.getWhereRrancAndRule(iTranc, iRule);
        ModelAndView modelAndView = getModelAndView(aiScores);
        return modelAndView;

    }

    private ModelAndView getModelAndView(List<AiScore> aiScores) {
        ModelAndView modelAndView = new ModelAndView("ai_score");
        modelAndView.addObject("ai_score", aiScores);
        modelAndView.setView(new MappingJackson2JsonView());
        return modelAndView;
    }
}
