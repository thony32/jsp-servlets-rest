import { createLazyFileRoute } from "@tanstack/react-router"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog'
import { placeApiService } from "../service/api"
import { useEffect, useState } from "react"

const Places = () => {
    const [places, setPlaces] = useState([]) as any;
    const [selectedPlace, setSelectedPlace] = useState(null) as any;
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [newPlaces, setNewPlaces] = useState([]) as any;

    const fetchPlaces = () => {
        placeApiService.getAllPlaces()
            .then(response => {
                setPlaces(response.data);
            })
            .catch(error => console.error('There was an error fetching the places:', error));
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

    const handleDeletePlace = (id: number) => {
        placeApiService.deletePlace(id)
            .then(() => {
                fetchPlaces();
            })
            .catch(error => console.error('There was an error deleting the place:', error));
    };

    const handleEditClick = (place: any) => {
        setSelectedPlace(place);
        setIsEditDialogOpen(true);
    };

    const handleUpdatePlace = (e: any) => {
        e.preventDefault(); // Prevent default form submission
        if (!selectedPlace) return;
        placeApiService.updatePlace(selectedPlace.codePlace, selectedPlace)
            .then(() => {
                setIsEditDialogOpen(false); // Close the dialog
                // Optionally: Refetch or update local employee list
                fetchPlaces();
            })
            .catch(error => console.error('Error updating employee:', error));
    };

    const handleCreatePlace = (e: any) => {
        e.preventDefault()
        placeApiService.createPlace(newPlaces)
            .then(() => {
                setNewPlaces({designation: '', province: ''})
                // Optionally: Refetch or update local employee list
                return placeApiService.getAllPlaces()
            })
            .then((response) => {
                setPlaces(response.data)
                fetchPlaces()
            })
            .catch(error => console.error('There was an error creating the place:', error));
    };

    return (
        <div className="p-2">
            <div className="flex items-center px-4 w-full h-12 bg-gray-100 rounded-lg">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/places">Lieux</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="px-[10%] py-[5%] space-y-[5%]">
                <h1 className="text-4xl font-extrabold">Lieux</h1>
                <p>On pourra ajouter, modifier, supprimer et lister tous les Lieux ici.</p>
                <div className="border border-gray-200 " />
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold">Lieux</h1>
                        <div className="flex gap-4">
                            {/* // NOTE: Dialog Ajouter Lieu */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary">Ajouter</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Ajouter un lieu</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Designation:
                                            </Label>
                                            <Input id="name" className="col-span-3" value={newPlaces.designation} onChange={(e) => setNewPlaces({ ...newPlaces, designation: e.target.value })} placeholder="Entrer Designation" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Province:
                                            </Label>
                                            <Input id="name" className="col-span-3" value={newPlaces.province} onChange={(e) => setNewPlaces({ ...newPlaces, province: e.target.value })} placeholder="Entrer Province" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleCreatePlace}>Ajouter</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    <Table>
                        <TableCaption className="text-left">Liste des Lieux</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Code</TableHead>
                                <TableHead className="bg-gray-200/50 rounded-t-sm">Designation</TableHead>
                                <TableHead>Province</TableHead>
                                <TableHead className="bg-gray-200/50 rounded-t-sm">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {places.map((place: any, i: number) => (<TableRow key={i}>
                                <TableCell className="font-bold">{place.codePlace}</TableCell>
                                <TableCell className="bg-gray-200/50">{place.designation}</TableCell>
                                <TableCell>{place.province}</TableCell>
                                <TableCell className="bg-gray-200/50 space-x-4 w-[25%]">
                                    {/* // NOTE: MOdifier lieu dialog */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-blue-500 hover:bg-blue-600 duration-300" onClick={()=>handleEditClick(place)}>Modifier</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Modifier un lieu</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Designation:
                                                    </Label>
                                                    <Input
                                                        id="edit-designation"
                                                        className="col-span-3"
                                                        placeholder="Entrer designation"
                                                        value={selectedPlace ? selectedPlace.designation : ''}
                                                        onChange={(e) => setSelectedPlace({ ...selectedPlace, designation: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Province:
                                                    </Label>
                                                    <Input
                                                        id="edit-province"
                                                        className="col-span-3"
                                                        placeholder="Entrer province"
                                                        value={selectedPlace ? selectedPlace.province : ''}
                                                        onChange={(e) => setSelectedPlace({ ...selectedPlace, province: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" onClick={handleUpdatePlace}>Modifier</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    {/* // NOTE: Dialog Supprimer lieu */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">Supprimer</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Voulez-vous vraiment supprimer {place.codePlace}?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action est irreversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeletePlace(place.codePlace)}>Supprimer</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export const Route = createLazyFileRoute("/places")({
    component: Places,
})
