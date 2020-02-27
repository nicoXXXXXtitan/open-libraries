<?php

namespace App\Controller\Api;

use App\Entity\Address;
use App\Entity\User;
use App\Repository\AddressRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


/**
 * @Route("/api/board", name="api_admin_board_")
 */
class ApiBoardController extends AbstractController
{
     /**
     * List of all users
     * @Route("/users/list", name="users_list", methods={"GET"})
     */
    public function listUsersJson(UserRepository $userRepository)
    {
        //dd($userRepository);

        //Serialization + Json format
        
        return $this->json($userRepository->findAll(), 200, [], ['groups' => 'api_users_infos']);
    }

    /**
     * Show one user
     * @Route("/user/{id}/show", name="user_show", methods={"GET"})
     */
    public function showUserJson(UserRepository $userRepository, $id)
    {
        //Serialization + Json format
        return $this->json($userRepository->find($id), 200, [], ['groups' => 'api_users_infos']);
    }

    /**
     * Add an user
     * @Route("/user/add", name="user_add", methods={"POST"})
     */
    public function addUserJson(Request $request, AddressRepository $addressRepository , UserPasswordEncoderInterface $encoder, EntityManagerInterface $em)
    {
        //Retrieve content of $request
        $jsonReceived = $request->getContent();

        //json to array format
        $userAdd = json_decode($jsonReceived, true);

        $newAddress = new Address;

        $newAddress->setStreet($userAdd['street']);
        $newAddress->setPostalCode($userAdd['postalcode']);
        $newAddress->setCity($userAdd['city']);
        $newAddress->setLongitude($userAdd['longitude']);
        $newAddress->setLatitude($userAdd['latitude']);
        $newAddress->setCreatedAt((new \DateTime()));

        $em->persist($newAddress);
        $em->flush();
        $lastAddress = $addressRepository->findOneBy([], ['id' => 'desc']);

        
        //$lastAddressId = $newAddress->getId();
        

        $newUser = new User;

        $newUser->setFirstname($userAdd['firstname']);
        $newUser->setLastname($userAdd['lastname']);
        $newUser->setEmail($userAdd['email']);
        $newUser->setPhoneNumber($userAdd['phoneNumber']);
        $plainPassword = $userAdd['password'];
        $encoded = $encoder->encodePassword($newUser, $plainPassword);
        $newUser->setPassword($encoded);
        $newUser->setRoles(["ROLE_USER"]);

        //$newUser->setPassword($userAdd['password']);
        $newUser->setAddress($lastAddress);
        $newUser->setCreatedAt((new \DateTime()));

        $userAdmin = $this->getUser();
        $libraryId = $userAdmin->getLibrary();
        $newUser->setLibrary($libraryId);
               
        $em->persist($newUser);
        $em->flush();

        return $this->json($userAdd, 200, [], ['groups' => '1']);

               
        
    }
    
    // à rajouter la route pour remove un user

   
}
