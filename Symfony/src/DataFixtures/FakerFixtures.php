<?php

namespace App\DataFixtures;

use Faker;
use App\entity\Address;
use App\entity\Book;
// use App\entity\Booking;
use App\entity\Library;
use App\entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Faker\ORM\Doctrine\Populator;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class FakerFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        // On demande un générateur en français
        $generator = Factory::create('fr_FR');

        // On passe le Manager de Doctrine à Faker
        $populator = new Faker\ORM\Doctrine\Populator($generator, $manager);

        $manager->flush();

        //Roles
        $roles = [
            'superadmin' => 'SuperAdministrateur',
            'admin' => 'Administrateur',
            'user' => 'Utilisateur',
            ];
    }
}
