from contextlib import (
    asynccontextmanager,
    contextmanager,
)

from loguru import logger
from sqlalchemy import create_engine
from sqlalchemy.exc import DatabaseError
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker

from app.settings import settings

sync_engine = create_engine(
    settings.SYNC_DATABASE_URL,
    echo=not settings.IN_PRODUCTION,
    future=True,
)

async_engine = create_async_engine(
    settings.ASYNC_DATABASE_URL,
    echo=not settings.IN_PRODUCTION,
    future=True,
)

sync_session_maker = sessionmaker(
    bind=sync_engine,
    autoflush=True,
    autocommit=False,
    expire_on_commit=False,
)

async_session_maker = async_sessionmaker(
    bind=async_engine,
    autoflush=True,
    autocommit=False,
    expire_on_commit=False,
)


def sync_get_db():
    session = sync_session_maker()
    try:
        yield session
    except DatabaseError as err:
        logger.error(str(err))
        raise err
    finally:
        session.close()


async def async_get_db():
    session = async_session_maker()
    try:
        yield session
    except DatabaseError as err:
        logger.error(str(err))
        raise err
    finally:
        await session.close()


sync_get_db_context = contextmanager(sync_get_db)
async_get_db_context = asynccontextmanager(async_get_db)
