<?php

namespace App\Repository;

use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\Expr\OrderBy;

/**
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Book::class);
    }

    public function listBooksByTypes($type)
    {
        $qb = $this->createQueryBuilder('b')
        ->where('b.type = :type')
        ->setParameter('type', $type)
        ->orderBy('b.type', 'ASC');

        $query = $qb->getQuery();

        return $query->execute();    
    }

    public function twoNewBooks()
    {
        $qb = $this->createQueryBuilder('b')
        ->setMaxResults(2)
        ->orderBy('b.createdAt', 'DESC');
        
        $query = $qb->getQuery();

        return $query->execute();
    }

    public function allBooksOderedByType()
    {
        //Find all books ordered by type
        $qb = $this->createQueryBuilder('b')
        ->select('b.title, b.type, b.isbn, b.author')
        ->orderBy('b.type');

        $query = $qb->getquery();
        
        return $query->execute();
    }

    public function listOfTypes()
    {
        //Find all types of books without any duplicate ones
        $qb = $this->createQueryBuilder('b')
        ->select('b.type')
        ->distinct('b.type');
        
        $query = $qb->getquery();
        
        return $query->execute();
    }
    /*
    public function findBookByAllMeans($value)
    {
        $em = $this->getDoctrine()->getManager();
        $query = 'SELECT * 
            FROM `book`
            IN (author, type, title)  
            WHERE '.$value;
        $statement = $em->getConnection()->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll();

        return $result;
    }
    */
    // /**
    //  * @return Book[] Returns an array of Book objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Book
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
