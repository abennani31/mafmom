package fr.msa.agora.mdw.mafmom.service;

import fr.msa.agora.mdw.mafmom.domain.Action;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Action}.
 */
public interface ActionService {

    /**
     * Save a action.
     *
     * @param action the entity to save.
     * @return the persisted entity.
     */
    Action save(Action action);

    /**
     * Get all the actions.
     *
     * @return the list of entities.
     */
    List<Action> findAll();


    /**
     * Get the "id" action.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Action> findOne(Long id);

    /**
     * Delete the "id" action.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
