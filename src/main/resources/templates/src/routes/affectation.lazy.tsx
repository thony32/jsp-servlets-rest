import { createLazyFileRoute } from '@tanstack/react-router'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Label } from "../components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog'
import { employeeApiService, placeApiService, affectApiService } from '../service/api'
import { useEffect, useState } from 'react'

const Affectation = () => {
  const [employees, setEmployees] = useState<any>([]);
  const [places, setPlaces] = useState([]) as any;
  const [affects, setAffects] = useState([]) as any
  const [selectedAffect, setSelectedAffect] = useState(null) as any;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newAffect, setNewAffect] = useState({
    employeeId: '',
    placeId: '',
    date: '',
  });


  // console.log(selectedAffect)

  useEffect(() => {
    fetchEmployees()
    fetchPlaces()
    fetchAffects()
  }, [])

  const fetchAffects = () => {
    affectApiService.getAllAffects()
      .then(response => {
        setAffects(response.data);
        // setAllEmployees(response.data);
        // console.log(response.data)
      })
      .catch(error => console.error('There was an error fetching the employees:', error));
  };

  const fetchEmployees = () => {
    employeeApiService.getAllEmployees()
      .then(response => {
        setEmployees(response.data);
        // setAllEmployees(response.data);
        // console.log(response.data)
      })
      .catch(error => console.error('There was an error fetching the employees:', error));
  };

  const fetchPlaces = () => {
    placeApiService.getAllPlaces()
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => console.error('There was an error fetching the places:', error));
  };

  const handleCreateAffect = (e: any) => {
    e.preventDefault();
    affectApiService.createAffect(newAffect)
      // console.log(newAffect)
      .then(() => {
        setNewAffect({ employeeId: '', placeId: '', date: '' }); // Reset form
        fetchAffects(); // Refresh the list
      })
      .catch(error => console.error('There was an error creating the affect:', error));
  };


  const handleEditClick = (affect: any) => {
    setSelectedAffect(affect);
    // console.log(affect)
    setIsEditDialogOpen(true);
  };

  // console.log(selectedAffect)
  const handleUpdateAffect = (e: any) => {
    e.preventDefault();
    if (!selectedAffect) return;
    affectApiService.updateAffect(selectedAffect.id, {
      employeeId: selectedAffect.employee.codeEmployee,
      placeId: selectedAffect.place.codePlace,
      date: selectedAffect.date,
    })
      .then(() => {
        setIsEditDialogOpen(false);
        fetchAffects(); // Refresh the list
      })
      .catch(error => console.error('Error updating affect:', error));
  };

  const handleDeleteAffect = (id: number) => {
    affectApiService.deleteAffect(id)
      .then(() => {
        fetchAffects(); // Refresh the list
      })
      .catch(error => console.error('Error deleting affect:', error));
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
              <BreadcrumbLink href="/affectation">Affectations</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-[10%] py-[5%] space-y-[5%]">
        <h1 className="text-4xl font-extrabold">Affectations Employées</h1>
        <p>On pourra Affecter un employé, modifier, supprimer et lister tous les Affectations ici.</p>
        <div className="border border-gray-200 " />
        <div className="space-y-3">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">Affectations</h1>
            <div className="flex gap-4">
              {/* // NOTE: Ajouter affectation dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Affecter un employé</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Affecter un employé un lieu</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Employé:
                      </Label>
                      <Select onValueChange={(value) => setNewAffect((prev) => ({ ...prev, employeeId: value }))}>
                        <SelectTrigger className="w-[276px]">
                          <SelectValue placeholder="Choisir code employé" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Code employé</SelectLabel>
                            {employees.map((employee: any, i: number) => (
                              <SelectItem key={i} value={employee.codeEmployee.toString()}>{employee.codeEmployee}</SelectItem>))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Lieu:
                      </Label>
                      <Select onValueChange={(value) => setNewAffect((prev) => ({ ...prev, placeId: value }))}>
                        <SelectTrigger className="w-[276px]">
                          <SelectValue placeholder="Choisir code lieu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Code lieu</SelectLabel>
                            {places.map((place: any, i: number) => (<SelectItem key={i} value={place.codePlace.toString()}>{place.codePlace}</SelectItem>))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Date:
                      </Label>
                      <Input type='date' id="date" value={newAffect.date} onChange={(e) => setNewAffect({ ...newAffect, date: e.target.value })} className="col-span-3" placeholder="Entrer le province" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateAffect}>Affecter un employé</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Table>
            <TableCaption className='text-left'>Liste des Affectations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-200/50 rounded-t-sm w-[300px]">Code employé</TableHead>
                <TableHead>Code Lieu</TableHead>
                <TableHead className="bg-gray-200/50 rounded-t-sm">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affects.map((affect: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="bg-gray-200/50">{affect.employee.codeEmployee}</TableCell>
                  <TableCell>{affect.place.codePlace}</TableCell>
                  <TableCell className="bg-gray-200/50">{affect?.date?.split('T')[0]}</TableCell>
                  <TableCell className=" space-x-4 w-[25%]">
                    {/* // NOTE: MOdifier affectation dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => handleEditClick(affect)}>Modifier</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Modifier l'affectation d'un employé</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Employé:
                            </Label>
                            <Select
                              // defaultValue={selectedAffect?.employee?.codeEmployee.toString()}
                              onValueChange={(value) => setSelectedAffect((prev: any) => ({ ...prev, employee: { ...prev.employee, codeEmployee: parseInt(value) } }))}>
                              <SelectTrigger className="w-[276px]">
                                <SelectValue placeholder={selectedAffect?.employee?.codeEmployee || "Choisir code employé"} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Code employé</SelectLabel>
                                  {employees.map((employee: any, i: number) => (
                                    <SelectItem key={i} value={employee.codeEmployee} onSelect={() => setSelectedAffect({ ...selectedAffect, employee })}>{employee.codeEmployee}</SelectItem>))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Lieu:
                            </Label>
                            <Select
                              // defaultValue={selectedAffect?.place?.codePlace.toString()}
                              onValueChange={(value) => setSelectedAffect((prev: any) => ({ ...prev, place: { ...prev.place, codePlace: parseInt(value) } }))}>
                              <SelectTrigger className="w-[276px]">
                                <SelectValue placeholder={selectedAffect?.place?.codePlace || "Choisir code lieu"} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Code lieu</SelectLabel>
                                  {places.map((place: any, i: number) => (<SelectItem key={i}
                                    value={place.codePlace}
                                    onSelect={() => setSelectedAffect({ ...selectedAffect, place })}>{place.codePlace}</SelectItem>))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Date:
                            </Label>
                            <Input
                              type='date'
                              id="affect-date"
                              value={selectedAffect?.date?.split('T')[0] ?? ''} // Assuming date comes in ISO format
                              onChange={(e) => setSelectedAffect({ ...selectedAffect, date: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleUpdateAffect}>Modifier</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {/* // NOTE: Dialog Supprimer affectation */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Supprimer</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Voulez-vous vraiment supprimer {affect.place.codePlace}?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action est irreversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteAffect(affect.id)}>Supprimer</AlertDialogAction>
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

export default Affectation

export const Route = createLazyFileRoute('/affectation')({
  component: Affectation,
})

