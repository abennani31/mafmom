package fr.msa.agora.mdw.mafmom.repository;

import fr.msa.agora.mdw.mafmom.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
