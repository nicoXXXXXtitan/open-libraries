<?php

namespace App\Repository;

use App\Entity\Booking;
use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method Booking|null find($id, $lockMode = null, $lockVersion = null)
 * @method Booking|null findOneBy(array $criteria, array $orderBy = null)
 * @method Booking[]    findAll()
 * @method Booking[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Booking::class);
    }

    // Check if this particular book is available to loan :
    // select all the booking entities where : book_id = $bookId and userOwner_id = $userOwnerId and date_of_disposal is not NULL, si all conditions are fulfilled return a true (=> sûrement une fonction à faire dans le Booking Repository). Si la requête est vide = true si la requête est remplie renvoie false
    // if true i can register my booking, je set all the params et je flush.
    // if false i send a message to the user : book not available to loan.

    public function isBookAvailable($bookId, $userOwnerId)
    {
        $qb = $this->createQueryBuilder('b')
        ->select('b')
        ->where('b.book = :book_id')
        ->andWhere('b.userOwner = :user_owner_id')
        ->andWhere('b.dateOfDisposal IS NULL')
        ->setParameter('book_id', $bookId)
        ->setParameter('user_owner_id', $userOwnerId);

        $query = $qb->getQuery();

        return $query->execute();
    }

    public function findTheOwnership($bookId, $userOwnerId)
    {
        $qb = $this->createQueryBuilder('b')
        ->select('b')
        ->where('b.book = :book_id')
        ->andWhere('b.userOwner = :user_owner_id')
        ->andWhere('b.dateOfDisposal IS NOT NULL')
        ->andWhere('b.userBorrower  IS NULL')
        ->setParameter('book_id', $bookId)
        ->setParameter('user_owner_id', $userOwnerId)
        ->setMaxResults(1);

        $query = $qb->getQuery();

        return $query->execute();
    }

    public function findTheOwnershipLibrary($bookId, $libraryOwnerId)
    {
        $qb = $this->createQueryBuilder('b')
        ->select('b')
        ->where('b.book = :book_id')
        ->andWhere('b.libraryOwner = :library_owner_id')
        ->andWhere('b.dateOfDisposal IS NOT NULL')
        ->andWhere('b.userBorrower  IS NULL')
        ->setParameter('book_id', $bookId)
        ->setParameter('library_owner_id', $libraryOwnerId)
        ->setMaxResults(1);

        $query = $qb->getQuery();

        return $query->execute(); 
    }

    public function isBookAvailableInLibrary($bookId, $libraryOwnerId)
    {
        $qb = $this->createQueryBuilder('b')
        ->select('b')
        ->where('b.book = :book_id')
        ->andWhere('b.libraryOwner = :library_owner_id')
        ->andWhere('b.dateOfDisposal IS NULL')
        ->setParameter('book_id', $bookId)
        ->setParameter('library_owner_id', $libraryOwnerId);

        $query = $qb->getQuery();

        return $query->execute();
    }

    public function joinBookingandBook($bookingId)
    {
        $qb = $this->createQueryBuilder('b')
        ->select('b.id', 'b.dateStart', 'b.dateEnd','b.dateOfDisposal','b.createdAt','book.title', 'book.id AS bookId' , 'book.description', 'book.author' , 'book.type', 'book.publicationDate', 'book.cover' )
        //->from('booking', 'b')
        ->innerJoin('b.book', 'book', 'b.book_id = book.id')
        ->where('b.id = :id')
        ->setParameter('id', $bookingId);
       
        $query = $qb->getQuery();

        return $query->execute();
    }

}
