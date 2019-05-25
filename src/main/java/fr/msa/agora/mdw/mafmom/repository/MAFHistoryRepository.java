package fr.msa.agora.mdw.mafmom.repository;

import fr.msa.agora.mdw.mafmom.domain.MAFHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MAFHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MAFHistoryRepository extends JpaRepository<MAFHistory, Long> {

}
