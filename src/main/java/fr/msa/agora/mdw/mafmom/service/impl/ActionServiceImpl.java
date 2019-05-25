package fr.msa.agora.mdw.mafmom.service.impl;

import fr.msa.agora.mdw.mafmom.service.ActionService;
import fr.msa.agora.mdw.mafmom.domain.Action;
import fr.msa.agora.mdw.mafmom.repository.ActionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Action}.
 */
@Service
@Transactional
public class ActionServiceImpl implements ActionService {

    private final Logger log = LoggerFactory.getLogger(ActionServiceImpl.class);

    private final ActionRepository actionRepository;

    public ActionServiceImpl(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    /**
     * Save a action.
     *
     * @param action the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Action save(Action action) {
        log.debug("Request to save Action : {}", action);
        return actionRepository.save(action);
    }

    /**
     * Get all the actions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Action> findAll() {
        log.debug("Request to get all Actions");
        return actionRepository.findAll();
    }


    /**
     * Get one action by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Action> findOne(Long id) {
        log.debug("Request to get Action : {}", id);
        return actionRepository.findById(id);
    }

    /**
     * Delete the action by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Action : {}", id);
        actionRepository.deleteById(id);
    }
}
