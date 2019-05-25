package fr.msa.agora.mdw.mafmom.repository;

import fr.msa.agora.mdw.mafmom.domain.MAF;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MAF entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MAFRepository extends JpaRepository<MAF, Long> {

}
