package fr.msa.agora.mdw.mafmom.service;

import fr.msa.agora.mdw.mafmom.domain.MAFHistory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link MAFHistory}.
 */
public interface MAFHistoryService {

    /**
     * Save a mAFHistory.
     *
     * @param mAFHistory the entity to save.
     * @return the persisted entity.
     */
    MAFHistory save(MAFHistory mAFHistory);

    /**
     * Get all the mAFHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MAFHistory> findAll(Pageable pageable);


    /**
     * Get the "id" mAFHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MAFHistory> findOne(Long id);

    /**
     * Delete the "id" mAFHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
