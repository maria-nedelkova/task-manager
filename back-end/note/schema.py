import graphene
from django.contrib.auth.models import User
from graphene import ObjectType
from graphene_django import DjangoObjectType

from .models import Note, ListOfNotes


class ListOfNotesType(DjangoObjectType):
    class Meta:
        model = ListOfNotes


class NoteType(DjangoObjectType):
    class Meta:
        model = Note


class Query(ObjectType):
    listOfNotes = graphene.Field(ListOfNotesType, id=graphene.Int())
    allListsOfNotes = graphene.List(ListOfNotesType)

    note = graphene.Field(NoteType, id=graphene.Int())
    notes = graphene.List(NoteType)

    def resolve_note(self, info, **kwargs):
        id = kwargs.get('id')
        if not info.context.user.is_authenticated:
            return Note.objects.none()
        else:
            if id is not None:
                return Note.objects.get(pk=id, user=info.context.user)

        return None

    def resolve_notes(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            return Note.objects.none()
        else:
            return Note.objects.filter(user=info.context.user)

    def resolve_allListsOfNotes(self, info, **kwargs):
        if not info.context.user.is_authenticated:
            return ListOfNotes.objects.none()
        else:
            return ListOfNotes.objects.filter(user=info.context.user)

    def resolve_listOfNotes(self, info, **kwargs):
        id = kwargs.get('id')
        if not info.context.user.is_authenticated:
            return ListOfNotes.objects.none()
        else:
            return ListOfNotes.objects.get  (pk=id, user=info.context.user)

class NoteInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.ID()
    list = graphene.ID()
    name = graphene.String()
    text = graphene.String()
    created = graphene.Date()

class ListOfNotesInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()
    user = graphene.ID()
    order = graphene.Int()

class CreateNote(graphene.Mutation):
    class Arguments:
        input = NoteInput(required=True)

    ok = graphene.Boolean()
    note = graphene.Field(NoteType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        note_instance = Note(name=input.name,
                             text=input.text,
                             user=User.objects.get(id=input.user),
                             list=ListOfNotes.objects.get(id=input.list))
        note_instance.save()
        return CreateNote(ok=ok, note=note_instance)


class CreateListOfNotes(graphene.Mutation):
    class Arguments:
        input = ListOfNotesInput(required=True)

    ok = graphene.Boolean()
    list = graphene.Field(ListOfNotesType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        list_instance = ListOfNotes(name=input.name,
                             user=User.objects.get(id=input.user),
                             order=input.order)
        list_instance.save()
        return CreateListOfNotes(ok=ok, list=list_instance)



class Mutation(graphene.ObjectType):
    create_note = CreateNote.Field()
    create_list_of_notes = CreateListOfNotes.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
